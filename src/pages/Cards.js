import React, { useEffect, useState } from "react";
import VirtualCard from "../components/VirtualCard";
import _ from "lodash";
import mockData from "../assets/mockData.json";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  InputGroup,
  Input,
} from "reactstrap";
import Select from "react-select";
import FilterIcon from "../assets/filter.svg";
import SearchIcon from "../assets/search.svg";

const Cards = () => {
  const [cardsInfo, setCardsInfo] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    burner: false,
    subscription: false,
    cardholder: "",
  });
  const [searchText, setSearchText] = useState("");

  let pathname = window.location.pathname;

  const getMockData = () => {
    return mockData;
  };

  const getColumns = () => {
    let col1 = [];
    let col2 = [];

    _.isArray(cardsInfo) &&
      _.get(cardsInfo, "length") > 0 &&
      cardsInfo.map((info, index) => {
        if (index % 2 === 0) {
          col1.push(info);
        } else {
          col2.push(info);
        }
      });
    return { col1, col2 };
  };

  const getFilteredData = () => {
    let mockData = getMockData();

    if (pathname?.includes("all-cards")) {
      return mockData.data;
    } else if (pathname?.includes("my-cards")) {
      let filteredData = mockData?.data.filter(
        (item) => mockData.my_owner_id === item.owner_id
      );
      return filteredData;
    } else if (pathname?.includes("blocked-cards")) {
      let filteredData = mockData?.data.filter(
        (item) => "blocked" === item.status
      );
      return filteredData;
    } else {
      return mockData.data;
    }
  };

  const applyFilters = () => {
    let filteredCards = [];
    let data = getFilteredData();

    if (filters.burner) {
      filteredCards = data.filter((item) => item.card_type === "burner");
    }
    if (filters.subscription) {
      filteredCards = data.filter((item) => item.card_type === "subscription");
    }
    if (_.isObject(filters.cardholder)) {
      filteredCards = data.filter(
        (item) => item.owner_name === filters.cardholder?.value
      );
    }

    setCardsInfo(filteredCards);
    setIsOpen(false);
  };

  const clearFilters = () => {
    let data = getFilteredData();

    setFilters({
      burner: false,
      subscription: false,
      cardholder: "",
    });
    setCardsInfo(data);
    setIsOpen(false);
  };

  useEffect(() => {
    let data = getFilteredData();

    setCardsInfo(data);
  }, [pathname]);

  const handleNameChange = (value) => {
    if (value) {
      setFilters({ ...filters, cardholder: value });
    } else {
      setFilters({ ...filters, cardholder: "" });
    }
  };

  const handleOnChange = (e, type) => {
    if (type === "subscription") {
      setFilters({ ...filters, subscription: e.target.checked });
    } else if (type === "burner") {
      setFilters({ ...filters, burner: e.target.checked });
    }
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    let filteredCards = [];
    let data = getFilteredData();

    if (searchText) {
      filteredCards = data.filter((item) =>
        item.name.toLowerCase().includes(searchText)
      );
    } else {
      return setCardsInfo(data);
    }

    setCardsInfo(filteredCards);
  };

  const getDropdownList = () => {
    let dropdownList = [];
    let cardholderNames = [];
    _.isArray(cardsInfo) &&
      _.get(cardsInfo, "length") > 0 &&
      cardsInfo.forEach((info, index) => {
        if (!cardholderNames.includes(info.owner_name)) {
          dropdownList.push({ value: info.owner_name, label: info.owner_name });
          cardholderNames.push(info.owner_name);
        }
      });
    return dropdownList;
  };

  const { col1, col2 } = getColumns();

  const getDesktopUI = () => {
    return (
      <>
        <div className="col-md-6">
          {col1?.length > 0 &&
            col1.map((info) => {
              return <VirtualCard info={info} />;
            })}
        </div>
        <div className="col-md-6">
          {col2?.length > 0 &&
            col2.map((info) => {
              return <VirtualCard info={info} />;
            })}
        </div>
      </>
    );
  };

  const getMobileUI = () => {
    let col = [...col1, ...col2];

    return (
      <>
        <div className="col-md-12">
          {col?.length > 0 &&
            col.map((info) => {
              return <VirtualCard info={info} />;
            })}
        </div>
      </>
    );
  };

  const getCardsUI = () => {
    if (window.innerWidth > 480) {
      return <>{getDesktopUI()}</>;
    } else {
      return <>{getMobileUI()}</>;
    }
  };

  const getModalUI = () => {
    return (
      <Modal
        centered={window.innerWidth < 430}
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
      >
        <ModalHeader>Filters</ModalHeader>
        <ModalBody>
          <div>
            <div>Type</div>
            <div className="d-flex mt-3">
              <div className="mr-5">
                <input
                  class="form-check-input ml-2"
                  type="checkbox"
                  checked={filters?.subscription}
                  onChange={(e) => handleOnChange(e, "subscription")}
                  id="flexCheckDefault"
                />
                <label class="form-check-label ml-4" for="flexCheckDefault">
                  &nbsp;Subscription
                </label>
              </div>
              <div className="ml-5">
                <input
                  class="form-check-input ml-2"
                  type="checkbox"
                  checked={filters?.burner}
                  onChange={(e) => handleOnChange(e, "burner")}
                  id="flexCheckDefault"
                />
                <label class="form-check-label ml-4" for="flexCheckDefault">
                  &nbsp;Burner
                </label>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div>Cardholder Name</div>
            <div className="d-flex mt-3">
              <Select
                className="basic-single"
                classNamePrefix="select"
                isSearchable={true}
                placeholder="Select Cardholder Name"
                name="color"
                value={filters.cardholder && filters.cardholder}
                onChange={handleNameChange}
                options={getDropdownList()}
              />
            </div>
          </div>
          <div></div>
          <div> </div>
        </ModalBody>
        <ModalFooter>
          <Button className="apply-filter" onClick={applyFilters}>
            Apply
          </Button>
          <Button className="clear-filter" onClick={clearFilters}>
            Clear
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  const getSearchBar = () => {
    return (
      <div className="search-bar shadow-lg">
        <InputGroup onSubmit={handleSearch}>
          <Input placeholder="Search for name" onChange={handleInputChange} />
          <Button
            className="search-button"
            onClick={handleSearch}
            type="submit"
          >
            <img src={SearchIcon} className="filter-icon" alt="filerIcon" />
          </Button>
        </InputGroup>
      </div>
    );
  };

  const getFilterButton = () => {
    return (
      <button
        className="btn ml-3 shadow-lg fw-bold"
        onClick={() => setIsOpen(true)}
      >
        <span style={{ fontSize: "14px" }}>
          {" "}
          <img src={FilterIcon} className="filter-icon" alt="filerIcon" />
          Filter
        </span>
      </button>
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-end mr-4">
        {getSearchBar()}
        {getFilterButton()}
        {getModalUI()}
      </div>
      {cardsInfo?.length > 0 ? (
        <div className="d-flex align-items-between justify-content-between">
          {getCardsUI()}
        </div>
      ) : (
        <h3 className="text-center">No matching cards..</h3>
      )}
    </div>
  );
};

export default Cards;
