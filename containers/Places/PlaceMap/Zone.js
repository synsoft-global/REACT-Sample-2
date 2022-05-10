/** Class representing zone seats layout in x and y direction */

import React, { useEffect, useState, useRef } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
    Row, Col, ButtonGroup, Button, Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import { Label, Input } from "reactstrap";
import { useTranslation } from "react-i18next";
import TooltipItem from "./Tooltip";
import BlankSeat from "./BlankSeat";
import Hold from "./Hold";
import SeatDetail from "./SeatDetail"
import _ from "lodash";
import { SelectableGroup, createSelectable } from "./reactselect";
import OverviewSeat from "./OverviewSeat";
import SelectedSeatOption from "./SelectedSeatOption"

const SelectableSeat = createSelectable(OverviewSeat);

const isNodeInRoot = (node, root) => {
    while (node) {
        if (node === root) {
            return true;
        }
        node = node.parentNode;
    }

    return false;
};

function Zone({ gridCells, selectedZone, onSubmit, onClose }) {

    const [zoneSeats, setZoneSeats] = useState(
        gridCells.filter((data) => data.zoneLabel === selectedZone.zoneLabel)
    );
    const [zoneSeatsInGrid, setZoneSeatsInGrid] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState({});
    const [seatDetailIsOpen, setSeatDetailIsOpen] = useState(false);
    const [seatPostionType, setSeatpositionType] = useState('');
    const [startSeatNumber, setStartSeatNumber] = useState(1);
    const [startRowNumber, setStartRowNumber] = useState(1);
    const [gridCellsTemp, setGridCellsTemp] = useState(_.cloneDeep(gridCells));
    const [isReloadGridData, setIsReloadGridData] = useState(false);
    const [rowType, setRowType] = useState('number');
    const [alphabetIndex, setAplhabetIndex] = useState('A');
    const [rowTypeDropdownOpen, setrowTypeDropdownOpen] = useState(false);
    const [aplhabetDropdownOpen, setAplhabetDropdownOpen] = useState(false);
    const alphabteAry = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const { t } = useTranslation();

    const innerRef = useRef(null);
    const selectable = useRef(null);
    const [draggedCells, setDraggedCells] = useState([]);
    const [dragSelectedSeats, setDragSelectedSeats] = useState([]);
    const [selectedRowNumber, setSelectedRowNumber] = useState('');
    const [rowNumber, setRowNumber] = useState('');
    const [modal, setModal] = useState(false);

    const toggleModal = () => setModal(!modal);

    const toggle = () => setrowTypeDropdownOpen((prevState) => !prevState);
    const toggleAlpha = () => setAplhabetDropdownOpen((prevState) => !prevState);

    useEffect(() => {
        const div = innerRef.current;
        // subscribe event
        div.addEventListener("click", clearItems);
        return () => {
            // unsubscribe event
            div.removeEventListener("click", clearItems);
        };
    }, []);

    const clearItems = (e) => {
        if (!isNodeInRoot(e.target, selectable.current)) {
            setDraggedCells([]);
        }
    };

     /* 
      // arrange postion of seats when change seat data
     */
    useEffect(() => {
        if (zoneSeats.length === undefined || zoneSeats.length === 0) {
            return
        }
        const zoneMaxpointOfx = _.maxBy(zoneSeats, o => o.x);
        const zoneMinPointOfx = _.minBy(zoneSeats, o => o.x);
        const zoneMinSeatNumber = _.minBy(zoneSeats, o => o.seat_number);
        const zoneMinPointOfY = _.minBy(zoneSeats, o => o.y);
        const zoneMinRowNumber = _.minBy(zoneSeats, o => o.row);
        setStartSeatNumber(zoneMinSeatNumber.placing.seat_number)
        if (zoneMinRowNumber) {
            setStartRowNumber(zoneMinRowNumber.placing.row)
        }

        if (isNaN(parseInt(zoneMinRowNumber.placing.row))) {
            setRowType('alphabet')
        }

        // set seats layout direction
        if (zoneMinPointOfY.placing.seat_number === zoneMinSeatNumber.placing.seat_number && zoneMinPointOfx.placing.row < zoneMaxpointOfx.placing.row) {
            setSeatpositionType('l2r&t2b')
        } else if (zoneMinPointOfY.placing.seat_number === zoneMinSeatNumber.placing.seat_number && zoneMinPointOfx.placing.row > zoneMaxpointOfx.placing.row) {
            setSeatpositionType('l2r&b2t')
        } else if (zoneMinPointOfY.placing.seat_number !== zoneMinSeatNumber.placing.seat_number && zoneMinPointOfx.placing.row < zoneMaxpointOfx.placing.row) {
            setSeatpositionType('r2l&t2b')
        } else if (zoneMinPointOfY.placing.seat_number !== zoneMinSeatNumber.placing.seat_number && zoneMinPointOfx.placing.row > zoneMaxpointOfx.placing.row) {
            setSeatpositionType('r2l&b2t')
        }

        const gridCols = [];
        for (var i = zoneMinPointOfx.x; i <= zoneMaxpointOfx.x; i++) {
            const seats = zoneSeats.filter((data) => data.x === i);
            gridCols.push(seats);
        }
        setZoneSeatsInGrid(gridCols);
    }, [zoneSeats]);

    /*
    * reload seat data if required
    */
    useEffect(() => {
        if (seatPostionType === '' || zoneSeats.length === undefined || zoneSeats.length === 0)
            return;

        const zoneMaxpointOfx = _.maxBy(zoneSeats, o => o.x);
        const zoneMinPointOfx = _.minBy(zoneSeats, o => o.x);
        const zoneMinPointOfY = _.minBy(zoneSeats, o => o.y);
        const zoneMaxPointOfY = _.maxBy(zoneSeats, o => o.y);

        const gridCols = [];

        for (var i = zoneMinPointOfx.x; i <= zoneMaxpointOfx.x; i++) {
            const seats = zoneSeats.filter((data) => data.x === i);
            seats.map((data, index) => {
                const seatNumber = calculateSeatNumber(startSeatNumber, data, zoneMinPointOfY, zoneMaxPointOfY)
                data.placing = {
                    seat_number: seatNumber,
                    zone: data.zoneLabel
                }
                seats[index] = data
            })

            gridCols.push(seats);
        }
        setZoneSeatsInGrid(gridCols);
        gridCols.map((colData, rowIndex) => {
            var emptyRowCount = calculateEmptyRows(gridCols, rowIndex)
            var xIndex1 = rowIndex + emptyRowCount
            if (seatPostionType === 'l2r&t2b' || seatPostionType === 'r2l&t2b') {
                xIndex1 = rowIndex - emptyRowCount
            }

            var rowOffset = rowType === 'number' ? startRowNumber : alphabetIndex.charCodeAt(0) - 65
            if (isNaN(rowOffset)) {
                rowOffset = alphabetIndex.charCodeAt(startRowNumber) - 64
            }

            colData.map((dataColSeat) => {
                const index = gridCellsTemp.findIndex((e) => e.x === dataColSeat.x && e.y === dataColSeat.y);

                if (index > -1) {
                    const data = gridCellsTemp[index];
                    data.placing = dataColSeat.placing
                    data.seat_number = parseInt(dataColSeat.placing.seat_number)
                    switch (seatPostionType) {
                    case 'l2r&t2b':
                        data.row = setRowValue(parseInt(rowOffset) + xIndex1)
                        data.placing.row = setRowValue(parseInt(rowOffset) + xIndex1)
                        break;
                    case 'l2r&b2t':
                        data.row = setRowValue(parseInt(rowOffset) + gridCols.length - (xIndex1 + 1))
                        data.placing.row = setRowValue(parseInt(rowOffset) + gridCols.length - (xIndex1 + 1))
                        break;
                    case 'r2l&t2b':
                        data.row = setRowValue(parseInt(rowOffset) + xIndex1)
                        data.placing.row = setRowValue(parseInt(rowOffset) + xIndex1)
                        break;
                    case 'r2l&b2t':
                        data.row = setRowValue(parseInt(rowOffset) + gridCols.length - (xIndex1 + 1))
                        data.placing.row = setRowValue(parseInt(rowOffset) + gridCols.length - (xIndex1 + 1))
                        break;
                    }
                    gridCellsTemp[index] = data;
                }
            });
        });
        setGridCellsTemp(gridCellsTemp)
    }, [isReloadGridData]);

    /*
    * calculate empty rows in seat zone
    * @param {*} gridCols and row index
    */
    const calculateEmptyRows = (gridCols, index) => {
        var gridColsLength = 0
        gridCols.map((colData, rowIndex) => {
            if (seatPostionType === 'l2r&t2b' || seatPostionType === 'r2l&t2b') {
                if (rowIndex < index) {
                    const rowEmptySeats = colData.filter((seatObj) => seatObj.zoneLabel === '')
                    if (rowEmptySeats.length === colData.length) {
                        gridColsLength++
                    }
                }
            } else {
                if (rowIndex > index) {
                    const rowEmptySeats = colData.filter((seatObj) => seatObj.zoneLabel === '')
                    if (rowEmptySeats.length === colData.length) {
                        gridColsLength++
                    }
                }
            }
        })
        return gridColsLength
    }

    useEffect(() => {
        setZoneSeats(gridCellsTemp.filter((data) => data.zoneLabel === selectedZone.zoneLabel));
    }, [gridCellsTemp])

    /*
    * set row number value, it will return alphabet or number according to type
    * @param {*} index of row
    */
    const setRowValue = (index) => {
        if (rowType === 'number') {
            return index
        } 
        let letters = ''
        while (index >= 0) {
            letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[index % 26] + letters
            index = Math.floor(index / 26) - 1
        }
        return letters
    }

    /**
     * Handle Seat on hold event
     * @param {*} item
     */
    const onHold = (item) => {
        setDragSelectedSeats([])
        setSeatDetailIsOpen(false)
        const index = gridCellsTemp.findIndex(
            (e) => e.x === item.x && e.y === item.y
        );
        if (index > -1) {
            const tempObj = gridCellsTemp[index];
            if (tempObj) {
                if (tempObj.zoneCat !== "" && tempObj.zoneLabel !== "") {
                    tempObj.zoneCat = "";
                    tempObj.zoneLabel = "";
                    tempObj.color = "transparent";
                    tempObj.additional_class_names = "classic";
                }
                const seats = gridCellsTemp;
                seats[index] = tempObj;
                const zSeats = seats.filter((data) => data.zoneLabel === selectedZone.zoneLabel)
                setZoneSeats(zSeats);
                setGridCellsTemp(seats)
                if (zSeats.filter((data) => data.y === item.y).length === 0 || zSeats.filter((data) => data.x === item.x).length === 0) {
                    setIsReloadGridData(!isReloadGridData)
                }
            }
        }
    };

    /**
     * hanlde seat number type position
     * @param {*} type
     */
    const handleSeatPositionType = (type) => {
        setSeatpositionType(type)
        setIsReloadGridData(!isReloadGridData)
    }

    /**
     * Handle Seat click
     * @param {*} item
     */
    const onClick = (item) => {
        setDragSelectedSeats([])
        setSelectedSeat(item);
        setSeatDetailIsOpen(true);
    };

    /**
     * Add removed seat from zone
     * @param {*} rowIndex 
     * @param {*} columnIndex 
     */
    const addSeatInZone = (rowIndex, columnIndex) => {
        setDragSelectedSeats([])
        const p4 = _.minBy(zoneSeats, o => o.x);
        const rIndex = p4.x + rowIndex
        const index = gridCellsTemp.findIndex(
            (e) => e.x === rIndex && e.y === columnIndex
        );

        if (index > -1) {
            let tempObj = gridCellsTemp[index];
            if (tempObj) {
                tempObj.zoneCat = selectedZone.zoneCat;
                tempObj.zoneLabel = selectedZone.zoneLabel;
                tempObj.color = selectedZone.color;
                tempObj.additional_class_names = "classic";

                const seats = gridCellsTemp;
                seats[index] = tempObj;
                tempObj = setSeatRowNumberAndOtherDetail(tempObj, seats.filter((data) => data.zoneLabel === selectedZone.zoneLabel))
                seats[index] = tempObj;
                if (zoneSeats.filter((data) => data.y === tempObj.y).length === 0 || zoneSeats.filter((data) => data.x === tempObj.x).length === 0) {
                    setTimeout(() => {
                        setIsReloadGridData(!isReloadGridData)
                    }, 300);
                }
                setZoneSeats(seats.filter((data) => data.zoneLabel === selectedZone.zoneLabel));
                setGridCellsTemp(seats)
            }
        }
    };

    /**
     * Set new seat number and other detail on add seat function
     * @param {*} seatObj 
     * @param {*} zoneSeats 
     */
    const setSeatRowNumberAndOtherDetail = (seatObj, zoneSeats) => {
        const zoneMinPointOfY = _.minBy(zoneSeats, o => o.y);
        const zoneMaxPointOfY = _.maxBy(zoneSeats, o => o.y);

        const rowNumber = calculateRowSeatNumber(seatObj)
        const seatNumber = calculateSeatNumber(startSeatNumber, seatObj, zoneMinPointOfY, zoneMaxPointOfY)

        seatObj.placing = {
            row: rowNumber,
            seat_number: seatNumber,
            zone: selectedZone.zoneLabel
        }
        seatObj.row = rowNumber
        seatObj.seat_number = seatNumber
        return seatObj
    }

    /**
     * calculate seat number on change row position change 
     * @param {*} seatObj 
     * @param {*} zoneSeats 
     */
    const calculateSeatNumber = (startSeatNumber, seatObj, zoneMinPointOfY, zoneMaxPointOfY) => {
        const emptyColumn = calculateEmptyColumn(seatObj, seatPostionType)
        switch (seatPostionType) {
        case 'l2r&t2b':
            return parseInt(startSeatNumber) + parseInt(seatObj.y - zoneMinPointOfY.y) - emptyColumn
        case 'l2r&b2t':
            return parseInt(startSeatNumber) + parseInt(seatObj.y - zoneMinPointOfY.y) - emptyColumn
        case 'r2l&t2b':
            return parseInt(startSeatNumber) + parseInt(zoneMaxPointOfY.y - seatObj.y) - emptyColumn
        case 'r2l&b2t':
            return parseInt(startSeatNumber) + parseInt(zoneMaxPointOfY.y - seatObj.y) - emptyColumn
        }
        return 0;
    }

    /**
     * calculate empty column for assing seat number in order
     * @param {*} seatObj 
     * @param {*} positionTypeValue 
     */
    const calculateEmptyColumn = (seatObj, positionTypeValue) => {
        var emptyColumnCount = 0
        if (positionTypeValue === 'l2r&t2b' || positionTypeValue === 'l2r&b2t') {
            const minYPointOnZone = _.minBy(zoneSeats, o => o.y);
            for (var i = seatObj.y - 1; i >= minYPointOnZone.y; i--) {
                const xDataEmpty = zoneSeats.filter((data) => data.y === i)
                if (xDataEmpty.length === 0) {
                    emptyColumnCount++
                }
            }
        } else {
            const maxYPointOnZone = _.maxBy(zoneSeats, o => o.y);
            for (var i = seatObj.y + 1; i <= maxYPointOnZone.y; i++) {
                const xDataEmpty = zoneSeats.filter((data) => data.y === i)
                if (xDataEmpty.length === 0) {
                    emptyColumnCount++
                }
            }
        }
        return emptyColumnCount
    }

     /**
     * calculate seats number in a row on change
     * @param {*} zoneSeats 
     */
    const calculateRowSeatNumber = (zoneSeats) => {
        var rowNumber = ''
        zoneSeatsInGrid.map((colData, rowIndex) => {
            var emptyRowCount = calculateEmptyRows(zoneSeatsInGrid, rowIndex)
            var xIndex1 = rowIndex + emptyRowCount
            if (seatPostionType === 'l2r&t2b' || seatPostionType === 'r2l&t2b') {
                xIndex1 = rowIndex - emptyRowCount
            }

            var rowOffset = rowType === 'number' ? startRowNumber : alphabetIndex.charCodeAt(0) - 65
            if (isNaN(rowOffset)) {
                rowOffset = alphabetIndex.charCodeAt(startRowNumber) - 64
            }
            const index = colData.filter((e) => e.x === zoneSeats.x).length;
            if (index > 0) {
                switch (seatPostionType) {
                case 'l2r&t2b':
                    rowNumber = setRowValue(parseInt(rowOffset) + xIndex1)
                    break;
                case 'l2r&b2t':
                    rowNumber = setRowValue(parseInt(rowOffset) + zoneSeatsInGrid.length - (xIndex1 + 1))
                    break;
                case 'r2l&t2b':
                    rowNumber = setRowValue(parseInt(rowOffset) + xIndex1)
                    break;
                case 'r2l&b2t':
                    rowNumber = setRowValue(parseInt(rowOffset) + zoneSeatsInGrid.length - (xIndex1 + 1))
                    break;
                }
            }
        });

        if (rowNumber !== '') {
            return rowNumber;
        } 
        setIsReloadGridData(!isReloadGridData)
        return 0;
    }

    /**
     * rerender seats on apply changes like change row direction
     */
    const onApply = () => {
        onSubmit(gridCellsTemp);
    }
    
    /**
     * store dragged keys in a state
     * @param {*} keys 
     */
    const handleSelection = (keys) => {
        setDraggedCells(keys);
    };
    
    /**
     * Handle drag finish event
     * @param {*} keys 
     */
    const onDragFinish = (keys) => {
        if (keys !== undefined && keys.length !== 1) {
            const cellsCoords = [];
            keys.map((data) => {
                const coords = data.split(",");
                cellsCoords.push({
                    x: parseInt(coords[0]),
                    y: parseInt(coords[1])
                });
            });
            setDragSelectedSeats(cellsCoords)
            setSeatDetailIsOpen(false)
        }
    };

   /**
   * handle row change click and open change option modal
   * @param {*} rowIndex
   */
    const handleRowNumberSelection = (rowNumber) => {
        setSelectedRowNumber(rowNumber)
        setRowNumber(rowNumber)
        setModal(true)
    }
  
  /**
   * Row option modal save button callback
   */
    const handleRowChangeAction = () => {
        toggleModal()
        if (rowNumber !== selectedRowNumber) {
            const gridCellsAry = gridCellsTemp;
            const filterData = gridCellsAry.filter((data) => data.row === selectedRowNumber)
            filterData.map((obj) => {
                const index = gridCellsAry.findIndex((e) => e.x === obj.x && e.y === obj.y);
                if (index > -1) {
                    const data = gridCellsAry[index];
                    data.row = rowNumber;
                    data.placing.row = rowNumber;
                    gridCellsAry[index] = data;
                }
            })
            setGridCellsTemp(gridCellsAry)
        }
    }

   /**
   * Handle Save click of seat change
   *  @param {*} seats
   */
    const handleSelectedSeatsSaveAction = (seats) => {
        setZoneSeats(seats.filter((data) => data.zoneLabel === selectedZone.zoneLabel));
        setGridCellsTemp(seats)
        setDragSelectedSeats([])
        setIsReloadGridData(!isReloadGridData)
    }

   /**
   * get seat postion for plotting on map
   * @param {*} rowIndex
   * @param {*} columnIndex
   */
    const getSeatPostion= (item) => {
        const zoneMinPointOfx = _.minBy(zoneSeats, o => o.x);
        const zoneMinPointOfY = _.minBy(zoneSeats, o => o.y);
        return {x: (item.x+item.xMargin) - zoneMinPointOfx.x, y: (item.y + item.yMargin) - zoneMinPointOfY.y};
    };


    /**
     * render zone seats in row form
     * @param {*} column
     * @param {*} rowIndex 
     */
    const renderRowData = (column, rowIndex) => {
        const p1 = _.maxBy(zoneSeats, o => o.y);
        const p2 = _.minBy(zoneSeats, o => o.y);

        if(p1 === undefined || p1 === undefined)
        {
            return(<div/>)
        }
        
        const columnData = []
        for (var i = p2.y; i <= p1.y; i++) {
            const item = column.filter((data) => data.y === i)[0]
            const isInDragSelection = draggedCells.findIndex((e) => e === `${rowIndex},${i}`) > -1;
            if (item !== undefined) {
                columnData.push(
                    <Hold 
                        onHold={() => !isInDragSelection ? onHold(item) : ''} onClick={() => onClick(item)} key={rowIndex + i}>
                        <SelectableSeat
                            gridCells={gridCells}
                            selectableKey={`${rowIndex},${i}`}
                            key={`${rowIndex},${i}`}
                            draggedCells={draggedCells}
                            index={`${rowIndex},${i}`}
                            number={i + 1}
                            color={''}
                            onClick={() => console.warn('click')}
                            seatPosition = {getSeatPostion(item)}
                            seatSize = {30}
                            marginLeft = {20}
                            comeForZone={true} >
                            {!isInDragSelection &&
                                <TooltipItem
                                    item={item}
                                    id={`${item.x}${item.y}`}
                                    number={item.placing.seat_number}
                                    color={isInDragSelection ? 'blue' : item.color}
                                />
                            }
                        </SelectableSeat>
                    </Hold>
                )
            } else {
                const zoneMinPointOfY = _.minBy(zoneSeats, o => o.y);
                columnData.push(
                    <div key={rowIndex + i} style = {{top: (rowIndex)*30, left: (i-zoneMinPointOfY.y)*30+20, position: 'absolute', width: 30, height: 30}}>
                        <BlankSeat
                            rowIndex={rowIndex}
                            columnIndex={i}
                            onClick={(rowIndex, columnIndex) => addSeatInZone(rowIndex, columnIndex)}
                            key={rowIndex + i}
                        />
                    </div>
                )
            }
        }

        return (columnData)
    }

    /*
    * render zone available change option
    */
    const renderZoneOptionView = () => {
        if (dragSelectedSeats.length !== 0) {
            return (
                <SelectedSeatOption
                    dragSelectedSeats={dragSelectedSeats}
                    gridCells={gridCellsTemp}
                    zoneSeats={zoneSeats}
                    onClose={() => setDragSelectedSeats([])}
                    onSubmit={(data) => handleSelectedSeatsSaveAction(data)}
                />
            )
        } 
        return (
            <Col sm={3}>
                <Col>
                    <Label>
                        {t("places.map.seatposition")}
                    </Label>
                </Col>
                <Col>
                    <Button onClick={() => handleSeatPositionType('l2r&t2b')} className={'zoneOptionMargin'}>
                        {'Top to bottom AND Left to right'}
                    </Button>
                    <Button onClick={() => handleSeatPositionType('l2r&b2t')} className={'zoneOptionMargin'}>
                        {'Bottom to top AND Left to right'}
                    </Button>
                    <Button onClick={() => handleSeatPositionType('r2l&t2b')} className={'zoneOptionMargin'}>
                        {'Top to bottom AND Right to left'}
                    </Button>
                    <Button onClick={() => handleSeatPositionType('r2l&b2t')} className={'zoneOptionMargin'}>
                        {'Bottom to top AND Right to left'}
                    </Button>
                </Col>
                <Col>
                    <Label className="zoneLabelTitle">
                        {t("places.map.startSeatNumber")}
                    </Label>
                </Col>
                <Col>
                    <Input
                        type="number"
                        value={startSeatNumber}
                        placeholder={t("places.map.startSeatNumber")}
                        onChange={event => {
                            setStartSeatNumber(event.target.value)
                            setIsReloadGridData(!isReloadGridData)
                        }}
                    />
                </Col>
                <Col>
                    <div className="seatTypeTitle">{t('places.map.rowType')}</div>
                    <Dropdown isOpen={rowTypeDropdownOpen} toggle={toggle}>
                        <DropdownToggle caret>
                            {t(`places.map.${rowType}`)}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => {
                                setRowType('number');
                                setIsReloadGridData(!isReloadGridData)
                            }}>
                                {t("places.map.number")}
                            </DropdownItem>
                            <DropdownItem onClick={() => {
                                setRowType('alphabet');
                                setIsReloadGridData(!isReloadGridData)
                            }}>
                                {t("places.map.alphabet")}
                            </DropdownItem>

                        </DropdownMenu>
                    </Dropdown>
                </Col>
                <Col>
                    <Label className="zoneLabelTitle">
                        {t("places.map.startRowNumber")}
                    </Label>
                </Col>
                <Col>
                    {rowType === 'number' &&
                        <Input
                            type="number"
                            value={startRowNumber}
                            placeholder={t("places.map.startRowNumber")}
                            onChange={event => {
                                setStartRowNumber(event.target.value)
                                setIsReloadGridData(!isReloadGridData)
                            }}
                        />}
                    {rowType !== 'number' &&
                        <Dropdown isOpen={aplhabetDropdownOpen} toggle={toggleAlpha}>
                            <DropdownToggle caret>
                                {alphabetIndex}
                            </DropdownToggle>
                            <DropdownMenu style={{ marginTop: 50 }}>
                                {
                                    alphabteAry.map((data, index) => {
                                        return (
                                            <DropdownItem onClick={() => {
                                                setAplhabetIndex(data)
                                                setIsReloadGridData(!isReloadGridData)
                                            }
                                            }
                                            key={index}>
                                                {data}
                                            </DropdownItem>
                                        )
                                    }
                                    )}
                            </DropdownMenu>
                        </Dropdown>
                    }
                </Col>
            </Col>
        )
    }
   
    // main return 
    return (
        <div className="Zone" ref={innerRef}>
            <h3>{t('places.map.zoneTitle', { name: selectedZone?.zoneLabel })}</h3>
            <Row>
                <Col lg={seatDetailIsOpen ? 6 : 9}>
                    <SelectableGroup
                        className="main"
                        ref={selectable}
                        onSelection={handleSelection}
                        onEndSelection={onDragFinish}
                        tolerance={0.1}
                        selectOnMouseMove={false}
                    >
                        <div style={{ overflow: 'auto' }}>
                            {zoneSeatsInGrid.map((column, index) => {
                                return (
                                    <div style={{ display: "flex", flexDirection: "row" }} key={index}>
                                        <div style={{ justifyContent: 'center', alignItems: 'center' }} onClick={() => handleRowNumberSelection(column[0]?.placing ? column[0].placing.row : '')}>
                                            <div style={{ width: 30, height: 30 }} >
                                                {column[0]?.placing ? column[0].placing.row : ''}
                                            </div>
                                        </div>
                                        {renderRowData(column, index)}
                                    </div>
                                );
                            })}
                        </div>
                    </SelectableGroup>
                </Col>
                {seatDetailIsOpen && (
                    <Col lg={3}>

                        <SeatDetail
                            seat={selectedSeat}
                            gridCells={gridCellsTemp}
                            onSubmit={(data) => {
                                setGridCellsTemp(data)
                                setSeatDetailIsOpen(false);
                            }}
                            onClose={() => setSeatDetailIsOpen(false)}
                        />

                    </Col>)
                }
                {renderZoneOptionView()}
            </Row>

            <Row>
                <Col className="text-right">
                    <br />
                    <ButtonGroup>
                        <Button color="warning" onClick={onClose}>
                            <span>{t("common.back")}</span>
                        </Button>
                    </ButtonGroup>
                </Col>
                <Col className="text-left">
                    <br />
                    <ButtonGroup>
                        <Button color="primary" onClick={onApply}>
                            <span>{t("common.apply")}</span>
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <Modal isOpen={modal} toggle={toggleModal} >
                <ModalHeader toggle={toggleModal}>Row Number</ModalHeader>
                <ModalBody>
                    <Input
                        value={rowNumber}
                        placeholder={t("places.map.startRowNumber")}
                        onChange={event => setRowNumber(event.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                    <Button color="primary" onClick={handleRowChangeAction}>Save</Button>{' '}
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Zone;