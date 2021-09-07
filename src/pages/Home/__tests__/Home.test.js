// UNIT TEST

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "..";
import ProviderTest from "../../../utils/test";
import userEvent from "@testing-library/user-event";

describe("#TablesList", () => {
  describe("#Smoke Tests", () => {
    it("should verify if exists the title of page", () => {
      const { getByText } = render(
        <ProviderTest>
          <Home />
        </ProviderTest>
      );

      expect(getByText(/Github - Interview/i)).toBeVisible();
    });
    it("should verify if exists the subtitle of page", () => {
      const { getByText } = render(
        <ProviderTest>
          <Home />
        </ProviderTest>
      );

      expect(getByText(/Compasso Uol - IgorBaio/i)).toBeVisible();
    });
    it("should verify if exists the Section to insere Data", () => {
      const { getByText, getByRole } = render(
        <ProviderTest>
          <Home />
        </ProviderTest>
      );

      expect(getByText(/Inserir Nome do Usuário/i)).toBeVisible();
      expect(
        getByText(/Selecione o nome do usuário que deseja buscar./i)
      ).toBeVisible();
      expect(getByRole("textbox")).toBeVisible();
    });
    it("should verify if exists the Section to insere Data", () => {
      const { getByRole } = render(
        <ProviderTest>
          <Home />
        </ProviderTest>
      );

      expect(getByRole("textbox")).toBeVisible();
    });
  });
  describe("#Component Functionality", () => {
    let usernameInput;
    let usernameTest;
    beforeEach(() => {
      usernameInput = render(
        <ProviderTest>
          <Home />
        </ProviderTest>
      ).getByRole("textbox");
      usernameTest = "igorbaio";
    });
    afterEach(() => {
      usernameInput = null;
      usernameTest = null;
    });
    describe("#UserName input", () => {
      it("should test username input have an empty value", () => {
        expect(usernameInput).toHaveAttribute("value", "");
      });
      it("should test username input have a value changed", () => {
        userEvent.type(usernameInput, usernameTest);
        expect(usernameInput).toHaveAttribute("value", usernameTest);
      });
    });
  });
});
