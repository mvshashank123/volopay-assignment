import React from "react";
import { CardBody, Card } from "reactstrap";
import ProgressBar from "react-bootstrap/ProgressBar";

import "../App.css";
import SubscriptionIcon from "../assets/refresh.svg";
import BurnerIcon from "../assets/flame.svg";

const VirtualCard = ({ info }) => {
  const {
    name,
    budget_name,
    spent,
    owner_name,
    available_to_spend,
    card_type,
    expiry,
    limit,
  } = info;

  let spentPercentage =
    (spent?.value / (spent?.value + available_to_spend?.value)) * 100;
  let availablePercentage = 100 - spentPercentage;
  let cardType = card_type?.toUpperCase();

  const getHeaderUI = () => {
    return (
      <div className="row">
        <div className="d-flex justify-content-between">
          <div className="mb-2">
            <h4 className="fw-bold">{name}</h4>
            <h6 className="text-muted">{`${owner_name}: ${budget_name}`}</h6>
          </div>
          <div className="bg-red">
            {card_type === "subscription" ? (
              <img
                src={SubscriptionIcon}
                className="card-icon"
                alt="Subscription Icon"
              />
            ) : (
              <img src={BurnerIcon} className="card-icon" alt="Burner Icon" />
            )}
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <p className="text-muted text-box">{cardType}</p>
          <p className="text-muted">
            {card_type === "burner" ? `Expires: ${expiry}` : `Limit: ${limit}`}
          </p>
        </div>
      </div>
    );
  };

  const getProgresBarUI = () => {
    return (
      <div className="mb-3">
        <ProgressBar>
          <ProgressBar variant="danger" now={spentPercentage} key={1} />
          <ProgressBar variant="success" now={availablePercentage} key={2} />
        </ProgressBar>
      </div>
    );
  };

  const getFooterUI = () => {
    return (
      <div>
        <div className="d-flex mt-2 justify-content-between">
          <div className="d-flex">
            <span class="dot-danger"></span>
            <h6 className="ml-2 fw-bold">Spent</h6>
          </div>
          <div>
            <h6 className="ml-2">
              {spent.value} {spent.currency}
            </h6>
          </div>
        </div>
        <div className="d-flex mt-2 justify-content-between">
          <div className="d-flex">
            <span class="dot-success"></span>
            <h6 className="ml-2 fw-bold">Available to spend</h6>
          </div>
          <div>
            <h6 className="ml-2 fw-bold">
              {available_to_spend.value} {available_to_spend.currency}
            </h6>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Card className="m-4 shadow-lg" style={{ borderRadius: "10px" }}>
        <CardBody>
          {getHeaderUI()}
          {getProgresBarUI()}
          {getFooterUI()}
        </CardBody>
      </Card>
    </div>
  );
};
export default VirtualCard;
