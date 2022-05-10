import React, { useState } from 'react';
import { Field } from 'redux-form'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { Row, Col } from 'reactstrap';
import { FormGroup, Label, Badge } from 'reactstrap';
import TranslatableField from '../../components/TranslatableField/TranslatableField';
import MoneyField from '../../components/MoneyField/MoneyField';
import PercentageField from '../../components/PercentageField/PercentageField';
import RolesField from '../../components/RolesField/RolesField';
import TickettypesField from '../../components/TickettypesField/TickettypesField';
import { Utils } from '../../services';
import classnames from 'classnames';
import HelpTooltips from '../HelpTooltips/HelpTooltips';

const PricingForm = ({ pricing, pricingId }) => {
    const { t } = useTranslation();
    const currency = Utils.currency();
    const [activeTab, setActiveTab] = useState('base');

    const { tickettypes } = useSelector(state => state.tickettypes);

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <>
            <Badge color="light" className="abs top-10 right-20">{pricing.key}</Badge>
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === 'base' })} onClick={() => { toggle('base'); }}>
                        {t('pricinglists.pricing.base_informations')}
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === 'display' })} onClick={() => { toggle('display'); }}>
                        {t('pricinglists.pricing.display')}
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: activeTab === 'rules' })} onClick={() => { toggle('rules'); }}>
                        {t('pricinglists.pricing.rules')}
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="base">
                    <br />
                    <FormGroup row >
                        <Label for="name" className="text-v-center" sm={2}>{t("pricinglists.pricing.name")}</Label>
                        <Col sm={10}>
                            <TranslatableField data-tip data-for={`nameTip.${pricingId}`} required name={`pricings[${pricingId}].name`} placeholder={t("pricinglists.pricing.name_placeholder")} component="input" />
                            <HelpTooltips id={`nameTip.${pricingId}`} value='name' />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label className="text-v-center" for="name" sm={2}>{t("pricinglists.pricing.description")}</Label>
                        <Col sm={10}>
                            <TranslatableField data-tip data-for={`descriptionTip.${pricingId}`} optional name={`pricings[${pricingId}].description`} placeholder={t("pricinglists.pricing.description_placeholder")} component="textarea"/>
                            <HelpTooltips id={`descriptionTip.${pricingId}`} value='description' />
                        </Col>
                    </FormGroup>
                    <hr />
                    <Row>
                        <Col>
                            <FormGroup row>
                                <Label for="price" sm={4}>{t("pricinglists.pricing.price")}</Label>
                                <Col sm={8} data-tip data-for={`priceTip.${pricingId}`}>
                                    <MoneyField required name={`pricings[${pricingId}].price[${currency}]`} />
                                    <HelpTooltips id={`priceTip.${pricingId}`} value='price' />
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup row>
                                <Label for="wallet_amount" sm={4} className="text-right">{t("pricinglists.pricing.wallet_amount")}</Label>
                                <Col sm={8}>
                                    <MoneyField data-tip data-for={`walletAmountTip.${pricingId}`} required name={`pricings[${pricingId}].wallet_amount[${currency}]`} />
                                    <HelpTooltips id={`walletAmountTip.${pricingId}`} value='wallet_amount'/>
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup row>
                                <Label for="value" sm={4}>{t("pricinglists.pricing.value")}</Label>
                                <Col sm={8}>
                                    <MoneyField data-tip data-for={`valueTip.${pricingId}`} required name={`pricings[${pricingId}].value[${currency}]`} />
                                    <HelpTooltips id={`valueTip.${pricingId}`} value='value' />
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup row>
                                <Label for="value_per_screening" sm={4} className="text-right">{t("pricinglists.pricing.value_per_screening")}</Label>
                                <Col sm={8}>
                                    <MoneyField data-tip data-for={`valuePerScreeningTip.${pricingId}`} required name={`pricings[${pricingId}].value_per_screening[${currency}]`} />
                                    <HelpTooltips id={`valuePerScreeningTip.${pricingId}`} value='value_per_screening' />
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup row>
                                <Label for="VAT" sm={4}>{t("pricinglists.pricing.VAT")}</Label>
                                <Col sm={8}>
                                    <PercentageField required name={`pricings[${pricingId}].VAT`} />
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup row>
                                <Label for="category" sm={4} className="text-right">{t("pricinglists.pricing.category")}</Label>
                                <Col sm={8}>
                                    <Field data-tip data-for={`categoryTip.${pricingId}`} component="input" type="text" className="form-control" name={`pricings[${pricingId}].category`} placeholder="default" />
                                    <HelpTooltips id={`categoryTip.${pricingId}`} value='category' />
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr />
                    <FormGroup row>
                        <Label className="text-v-center" for="name" sm={2}>{t("pricinglists.pricing.elligibility")}</Label>
                        <Col sm={10}>
                            <TranslatableField data-tip data-for={`elligibilityTip.${pricingId}`} optional name={`pricings[${pricingId}].opaque.elligibility`} placeholder={t("pricinglists.pricing.elligibility_placeholder")} component="input" />
                            <HelpTooltips id={`elligibilityTip.${pricingId}`} value='elligibility' />
                        </Col>
                    </FormGroup>
                </TabPane>
                <TabPane tabId="display">
                    <br />
                    <Row>
                        <Col>
                            <FormGroup row>
                                <Label for="eshop_sort_weight" sm={4}>{t("pricinglists.pricing.eshop_sort_weight")}</Label>
                                <Col sm={8} data-tip data-for={`orderTip.${pricingId}`}>
                                    <Field component="input" type="text" className="form-control" name={`pricings[${pricingId}].opaque.eshop_sort_weight`} />
                                </Col>
                                <HelpTooltips id={`orderTip.${pricingId}`} value='order' />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup row>
                                <Label for="additional_class_names" sm={4} className="text-right">{t("pricinglists.pricing.additional_class_names")}</Label>
                                <Col sm={8}>
                                    <Field data-tip data-for={`cssclassTip.${pricingId}`} component="input" type="text" className="form-control" name={`pricings[${pricingId}].opaque.additional_class_names`} />
                                    <HelpTooltips id={`cssclassTip.${pricingId}`} value='css_class' />
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="rules">
                    <br />
                    <Row>
                        <Col>
                            <FormGroup row>
                                <Label for="name" sm={12}>{t("pricinglists.pricing.limit_to_sellers")}</Label>
                                <Col sm={12} data-tip data-for={`roleTip.${pricingId}`}>
                                    <RolesField name={`pricings[${pricingId}].sellers`} />
                                </Col>
                                <HelpTooltips id={`roleTip.${pricingId}`} value='role' />
                            </FormGroup>
                        </Col>
                    </Row>
                    {tickettypes && (
                        <Row>
                            <Col>
                                <FormGroup row>
                                    <Label for="name" sm={12}>{t("pricinglists.pricing.limit_to_tickettypes")}</Label>
                                    <Col sm={12} data-tip data-for={`pricelimiteTip.${pricingId}`}>
                                        <TickettypesField
                                            name={`pricings[${pricingId}].rules.only_for_tickettypes`}
                                            tickettypes={tickettypes}
                                        />
                                    </Col>
                                    <HelpTooltips id={`pricelimiteTip.${pricingId}`} value='pricing_limit' />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup row>
                                    <Label for="name" sm={12}>{t("pricinglists.pricing.exclude_tickettypes")}</Label>
                                    <Col sm={12} data-tip data-for={`priceforbidenTip.${pricingId}`}>
                                        <TickettypesField
                                            name={`pricings[${pricingId}].rules.exclude_tickettypes`}
                                            tickettypes={tickettypes}
                                        />
                                    </Col>
                                    <HelpTooltips id={`priceforbidenTip.${pricingId}`} value='pricing_forbiden' />
                                </FormGroup>
                            </Col>
                        </Row>
                    )}
                </TabPane>
            </TabContent>
        </>
    );
}

export default PricingForm;

