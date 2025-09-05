import { useState } from "react";
import * as Icons from "../../assets/icons";
import NavButton from "../ui/NavButton";
import styles from "../../styles/Nav.module.scss";

const Nav = () => {
  const [activeItem, setActiveItem] = useState("users");

  const handleNavClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.orgSwitcher}>
        <NavButton
          icon={<Icons.BriefcaseIcon />}
          onClick={() => {}}
          className={styles.switchOrg}
        >
          <>
            Switch Organization
            <Icons.ChevronDownIcon width={14} height={14} />
          </>
        </NavButton>
      </div>

      <NavButton
        icon={<Icons.HouseIcon />}
        isActive={activeItem === "dashboard"}
        onClick={() => handleNavClick("dashboard")}
      >
        Dashboard
      </NavButton>

      <div className={styles.navSection}>
        <p className={styles.sectionTitle}>CUSTOMERS</p>
        <NavButton
          icon={<Icons.UsersIcon />}
          isActive={activeItem === "users"}
          onClick={() => handleNavClick("users")}
        >
          Users
        </NavButton>
        <NavButton
          icon={<Icons.GuarantorsIcon />}
          isActive={activeItem === "guarantors"}
          onClick={() => handleNavClick("guarantors")}
        >
          Guarantors
        </NavButton>
        <NavButton
          icon={<Icons.LoanIcon />}
          isActive={activeItem === "loans"}
          onClick={() => handleNavClick("loans")}
        >
          Loans
        </NavButton>
        <NavButton
          icon={<Icons.DecisionIcon />}
          isActive={activeItem === "decision-models"}
          onClick={() => handleNavClick("decision-models")}
        >
          Decision Models
        </NavButton>
        <NavButton
          icon={<Icons.SavingsIcon />}
          isActive={activeItem === "savings"}
          onClick={() => handleNavClick("savings")}
        >
          Savings
        </NavButton>
        <NavButton
          icon={<Icons.LoanRequestIcon />}
          isActive={activeItem === "loan-requests"}
          onClick={() => handleNavClick("loan-requests")}
        >
          Loan Requests
        </NavButton>
        <NavButton
          icon={<Icons.WhitelistIcon />}
          isActive={activeItem === "Whitelist"}
          onClick={() => handleNavClick("Whitelist")}
        >
          Whitelist
        </NavButton>
        <NavButton
          icon={<Icons.KarmaIcon />}
          isActive={activeItem === "Karma"}
          onClick={() => handleNavClick("Karma")}
        >
          Karma
        </NavButton>
      </div>
      <div className={styles.navSection}>
        <p className={styles.sectionTitle}>BUSINESSES</p>
        <NavButton
          icon={<Icons.BriefcaseIcon />}
          isActive={activeItem === "Organization"}
          onClick={() => handleNavClick("Organization")}
        >
          Organization
        </NavButton>
        <NavButton
          icon={<Icons.LoanProductIcon />}
          isActive={activeItem === "Loan Products"}
          onClick={() => handleNavClick("Loan Products")}
        >
          Loan Products
        </NavButton>
        <NavButton
          icon={<Icons.ProductIcon />}
          isActive={activeItem === "Savings-Products"}
          onClick={() => handleNavClick("Savings-Products")}
        >
          Savings Products
        </NavButton>
        <NavButton
          icon={<Icons.ChargesIcon />}
          isActive={activeItem === "fees-charges"}
          onClick={() => handleNavClick("fees-charges")}
        >
          Fees and Charges
        </NavButton>
        <NavButton
          icon={<Icons.TransactionIcon />}
          isActive={activeItem === "transaction"}
          onClick={() => handleNavClick("transaction")}
        >
          Transaction
        </NavButton>
        <NavButton
          icon={<Icons.ServicesIcon />}
          isActive={activeItem === "services"}
          onClick={() => handleNavClick("services")}
        >
          Services
        </NavButton>
        <NavButton
          icon={<Icons.AccountIcon />}
          isActive={activeItem === "service-account"}
          onClick={() => handleNavClick("service-account")}
        >
          Service Account
        </NavButton>
        <NavButton
          icon={<Icons.SettlementIcon />}
          isActive={activeItem === "settlement"}
          onClick={() => handleNavClick("settlement")}
        >
          Settlement
        </NavButton>
        <NavButton
          icon={<Icons.ReportsIcon />}
          isActive={activeItem === "report"}
          onClick={() => handleNavClick("report")}
        >
          Reports
        </NavButton>
      </div>
      
      <div className={styles.navSection}>
        <p className={styles.sectionTitle}>SETTINGS</p>
        <NavButton
          icon={<Icons.PreferencesIcon />}
          isActive={activeItem === "preference"}
          onClick={() => handleNavClick("preference")}
        >
          Preferences
        </NavButton>
        <NavButton
          icon={<Icons.PricingIcon />}
          isActive={activeItem === "fess-pricing"}
          onClick={() => handleNavClick("fess-pricing")}
        >
          Fees and Pricing
        </NavButton>
        <NavButton
          icon={<Icons.AuditIcon />}
          isActive={activeItem === "audit-log"}
          onClick={() => handleNavClick("audit-log")}
        >
          Audit Logs
        </NavButton>
      </div>
    </nav>
  );
};

export default Nav;
