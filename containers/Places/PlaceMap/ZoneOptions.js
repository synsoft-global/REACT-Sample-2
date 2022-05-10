import React, { useState } from "react";
import { Row, Col, ButtonGroup, Button } from "reactstrap";
import { FormGroup, Label, InputGroup, InputGroupText, Input } from "reactstrap";
import { useTranslation } from "react-i18next";
import _ from "lodash";

const randomColor = require("randomcolor");

function ZoneOptions({ gridCells, draggedCellsCoords, onSubmit, onClose }) {
    const { t } = useTranslation();

    const [zoneCat, setZoneCat]                 = useState("default");
    const [label, setLabel]                     = useState("");
    const [startSeatNumber, setStartSeatNumber] = useState(1);
    const [startRowNumber, setStartRowNumber]   = useState(1);
    const [availableCat]                        = useState(
        _.without(_.uniq(_.map(gridCells, "zoneCat")), "")
    );

    /**
     * handle category selection
     * @param {} index
     */
    const chooseCatName = (index) => {
        setZoneCat(availableCat[index]);
    };

    /**
     * hanlde submit event
     */
    const submitData = () => {
        if (label === "") {
            alert("please select label");
            return;
        }

        let randomClr = randomColor({
            luminosity: "light",
            hue: "random",
        });

        const objData = gridCells.filter((data) => data.zoneLabel === label);
        if (objData && objData.length !== 0) {
            randomClr = objData[0].color;
        }

        const zoneMaxpointOfx = _.maxBy(draggedCellsCoords, o => o.x);
        const zoneMinPointOfx = _.minBy(draggedCellsCoords, o => o.x);

        const gridCols = [];
        for (var xIndex = zoneMinPointOfx.x; xIndex <= zoneMaxpointOfx.x; xIndex++) {
            const col = draggedCellsCoords.filter((data) => data.x === xIndex);
            col.map((colObj, index) => {
                colObj.placing = {
                    row: parseInt(xIndex)+ 1,
                    seat_number: parseInt(startSeatNumber) + index,
                    zone: label,
                };
                colObj.seat_number = parseInt(startSeatNumber) + index
                col[index] = colObj;
            });
            gridCols.push(col);
        }

        const newCells = _.cloneDeep(gridCells);
        gridCols.map((colData, rowIndex) => {
            colData.map((dataColSeat) => {
                const index = newCells.findIndex((e) => e.x === dataColSeat.x && e.y === dataColSeat.y);
                if (index > -1) {
                    const data = newCells[index];
                    data.color = randomClr;
                    data.zoneLabel = label;
                    data.zoneCat = zoneCat;
                    data.placing = dataColSeat.placing
                    data.seat_number = parseInt(dataColSeat.placing.seat_number)
                    data.row =  parseInt(startRowNumber)+rowIndex
                    data.placing.row =  parseInt(startRowNumber)+rowIndex
                    newCells[index] = data;
                }
            });
        });

        onSubmit(newCells);
    };

    const displayZoneCoordinate = () => {
        const p1 = _.minBy(draggedCellsCoords, o => o.x);
        const p2 = _.maxBy(draggedCellsCoords, o => o.x);
        const p3 = _.maxBy(draggedCellsCoords, o => o.y);

        return (
            <div>
                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
                >
                    <div>{`${parseInt(p1.x) + 1},${parseInt(p1.y) + 1}`}</div>
                    <div>-----</div>
                    <div>{`${parseInt(p3.x) + 1},${parseInt(p3.y) + 1}`}</div>
                </div>

                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div>{`${parseInt(p2.x) + 1},${parseInt(p2.y) + 1}`}</div>
                    <div>-----</div>
                    <div>{`${parseInt(p2.x) + 1},${parseInt(p3.y) + 1}`}</div>
                </div>
            </div>
        );
    };

    return (
        <div className="ZoneOptions">
            <h3>{ t('places.map.zoneOptionsTitle') }</h3>
            <FormGroup row>
                <Label for="label" sm={3}>
                    { t("places.map.zonelabel") }
                </Label>
                <Col sm={9}>
                    <Input
                        type="text"
                        value={ label }
                        placeholder={ t("places.map.zonelabel") }
                        onChange={ event => setLabel(event.target.value) }
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="offset" sm={3}>
                    { t("places.map.startSeatNumber") }
                </Label>
                <Col sm={9}>
                    <Input
                        type="number"
                        value={ startSeatNumber }
                        placeholder={ t("places.map.startSeatNumber") }
                        onChange={ event => setStartSeatNumber(event.target.value) }
                    />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="offset" sm={3}>
                    { t("places.map.startRowNumber") }
                </Label>
                <Col sm={9}>
                    <Input
                        type="number"
                        value={ startRowNumber }
                        placeholder={ t("places.map.startRowNumber") }
                        onChange={ event => setStartRowNumber(event.target.value) }
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="category" sm={3}>
                    { t("places.map.category") }
                </Label>
                <Col sm={9}>
                    <InputGroup>
                        { availableCat.map((data, index) => {
                            return (
                                <InputGroupText key={ index }>
                                    <Button onClick={ () => chooseCatName(index) }>
                                        {data}
                                    </Button>
                                </InputGroupText>
                            );
                        })}
                        <Input
                            type="text"
                            value={ zoneCat }
                            placeholder={"Zone Seats Category"}
                            onChange={ event => setZoneCat(event.target.value) }
                        />
                    </InputGroup>
                </Col>
            </FormGroup>
            <Row>
                <Col sm={ 3 }>{ t("places.map.totalSeats") }</Col>
                <Col sm={ 9 }>{ draggedCellsCoords.length }</Col>
            </Row>
            <Row>
                <Col sm={ 3 }>{ t("places.map.zoneCoordinates") }</Col>
                <Col sm={ 9 }>{ displayZoneCoordinate() }</Col>
            </Row>
            <Row>
                <Col className="text-center">
                    <br />
                    <ButtonGroup>
                        <Button color="warning" onClick={ onClose }>
                            <span>{t("common.back")}</span>
                        </Button>
                        <Button color="success" onClick={ submitData }>
                            <span>{t("common.save")}</span>
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </div>
    );
}

export default ZoneOptions;
