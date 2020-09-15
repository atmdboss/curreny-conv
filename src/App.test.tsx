import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./components/Header";
import { ratesType } from "./types";
import CustomTable from "./components/Table";
import TableData from "./components/TableData";
import Exchange from "./components/Exchange";

const mockApiData: ratesType = [
  { ccy: "USD", base_ccy: "UAH", buy: "27.80000", sale: "28.17000" },
  { ccy: "EUR", base_ccy: "UAH", buy: "32.75000", sale: "33.35000" },
  { ccy: "RUR", base_ccy: "UAH", buy: "0.36000", sale: "0.39000" },
  { ccy: "BTC", base_ccy: "USD", buy: "10202.5487", sale: "11276.5011" },
];

afterAll(cleanup);

test("renders Header", () => {
  const { getByText } = render(<Header />);
  const linkElement = getByText(/currency exchange/i);
  expect(linkElement).toBeInTheDocument();
});

describe("currency converter functionality", () => {
  test("exchange component loads with inital values", () => {
    const exchangeComp = render(
      <Exchange
        rates={mockApiData}
        currency={["UAH", "EUR", "USD", "BTC", "RUR"]}
      />
    );
    const usd = exchangeComp.queryByLabelText("USD");
    const uah = exchangeComp.queryByLabelText("UAH");
    expect(usd).toBeInTheDocument();
    expect(uah).toBeInTheDocument();
  });

  test("converting works", () => {
    const exchangeComp = render(
      <Exchange
        rates={mockApiData}
        currency={["UAH", "EUR", "USD", "BTC", "RUR"]}
      />
    );
    const inputChange = exchangeComp.getAllByText("Change")[0]
      .nextElementSibling?.firstElementChild;
    const inputGet = exchangeComp.getAllByText("Get")[0].nextElementSibling
      ?.firstElementChild;
    if (inputChange && inputGet) {
      userEvent.type(inputChange, "100");
      expect(inputChange.value).toBe("100");
      expect(Number(inputGet.value)).toBeCloseTo(2780.0);
    }
  });

  test("switching currencies", () => {
    const exchangeComp = render(
      <Exchange
        rates={mockApiData}
        currency={["UAH", "EUR", "USD", "BTC", "RUR"]}
      />
    );

    const change = exchangeComp.queryByLabelText("USD");
    const get = exchangeComp.queryByLabelText("UAH");
    const button = exchangeComp.getByRole("switch-btn");
    const inputChange = exchangeComp.getAllByText("Change")[0]
      .nextElementSibling?.firstElementChild;
    const inputGet = exchangeComp.getAllByText("Get")[0].nextElementSibling
      ?.firstElementChild;

    expect(change?.textContent).toBe("USD");
    expect(get?.textContent).toBe("UAH");

    if (inputChange && inputGet) {
      userEvent.type(inputChange, "100");
      expect(Number(inputGet.value)).toBeCloseTo(2780.0);
    }

    // flip currencies
    fireEvent.click(button);

    expect(change?.textContent).toBe("UAH");
    expect(get?.textContent).toBe("USD");

    if (inputChange && inputGet) {
      expect(Number(inputGet.value)).toBeCloseTo(3.55);
    }
  });

  test("changed rate updates", () => {
    const exchangeComp = render(
      <Exchange
        rates={mockApiData}
        currency={["UAH", "EUR", "USD", "BTC", "RUR"]}
      />
    );
    const inputChange = exchangeComp.getAllByText("Change")[0]
      .nextElementSibling?.firstElementChild;
    const inputGet = exchangeComp.getAllByText("Get")[0].nextElementSibling
      ?.firstElementChild;
    const changedRate = mockApiData.map((rate) => {
      return rate.ccy === "USD" && rate.base_ccy === "UAH"
        ? { ...rate, buy: "28.98" }
        : rate;
    });

    if (inputChange && inputGet) {
      userEvent.type(inputChange, "100");
      expect(Number(inputGet.value)).toBeCloseTo(2780.0);
    }

    exchangeComp.rerender(
      <Exchange
        rates={changedRate}
        currency={["UAH", "EUR", "USD", "BTC", "RUR"]}
      />
    );

    if (inputChange && inputGet) {
      expect(Number(inputGet.value)).toBeCloseTo(2898.0);
    }
  });
});

describe("table functionality", () => {
  test("rates appear on page", () => {
    const tableComp = render(<CustomTable rates={mockApiData} />);
    const dollHrv = tableComp.getByText("USD / UAH");
    const eurHrv = tableComp.getByText("EUR / UAH");
    const rubHrv = tableComp.getByText("RUR / UAH");
    const btcdoll = tableComp.getByText("BTC / USD");

    expect(dollHrv).toBeInTheDocument();
    expect(eurHrv).toBeInTheDocument();
    expect(rubHrv).toBeInTheDocument();
    expect(btcdoll).toBeInTheDocument();
  });

  test("rate update with correct value", () => {
    const tableDataComp = render(
      <TableData type="buy" ccy="USD" baseCcy="UAH" value="27.80" />
    );
    const editBtn = tableDataComp.getByRole("edit-btn");

    userEvent.click(editBtn);

    const saveBtn = tableDataComp.getByRole("save-btn");

    expect(saveBtn.getAttribute("disabled")).toBe("");

    const inputEl = tableDataComp.getByText(
      "Possible values must be +10% or -10% of original value"
    ).previousElementSibling?.firstElementChild;
    if (inputEl) {
      userEvent.type(inputEl, "29.34"); //incorrect value
      expect(inputEl.value).toBe("29.34");
      expect(saveBtn.getAttribute("disabled")).toBe("");

      userEvent.type(inputEl, "30.58"); //+10% of 27.80(correct value)
      expect(inputEl.value).toBe("30.58");
      expect(saveBtn.getAttribute("disabled")).toBe(null);
    }
  });
});
