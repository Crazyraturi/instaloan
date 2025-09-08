// ================= Fixed Loan Card System =================

const loanData = {
  personal: [
    {
      name: "Poonawalla Fincorp",
      link: "https://instant-pocket-loan.poonawallafincorp.com/?utm_DSA_Code=PKA00192&UTM_Partner_Name=BuddyLoan&UTM_Partner_Medium=digiloans&UTM_Partner_AgentCode=DSA&UTM_Partner_ReferenceID=PK2002",
      image: "./images/punewala.svg",
    },
    {
      name: "Lendingplate",
      link: "https://loan.indiasales.club?productCode=LPL&journeyId=1&shortCode=1i2PwQUfAwmwtH3etD4R6&subCode=l&productTypeId=480&productType=Personal%20Loan&memberId=4HC66777&transitionId=2e39ea5d-e3db-4159-91c3-0631353ebeb3",
      image: "./images/lendingplate.png",
    },
    {
      name: "Prefr",
      link: "https://marketplace.prefr.com/buddyloan?utm_source=buddyloan&utm_medium=digiloans&utm_content=content1&utm_campaign=DSA",
      image: "./images/prif.avif",
    },
    {
      name: "KreditBee",
      link: "https://loan.indiasales.club?productCode=KREDITBEE&journeyId=1&shortCode=1i2PwQUfAwmwtH3etD4R6&subCode=l&productTypeId=269&productType=Personal%20Loan&memberId=4HC66777&transitionId=2e39ea5d-e3db-4159-91c3-0631353ebeb3",
      image: "./images/kriditbee.svg",
    },
    {
      name: "Unity SFB",
      link: "https://loans.theunitybank.com/unity-pl-ui/page/exclusion/login/logindetails?utm_source=buddyloan&utm_medium=digiloans&utm_campaign=DSA",
      image: "./images/Unity_Small_Finnace_Bank_e7d2ec53d7.avif",
    },
  ],
  business: [
    {
      name: "Flexiloans",
      link: "https://loans.flexiloans.com/?nlp=1&partnerCode=64f1be98nfwae&utm_source=partner&utm_medium=buddyloan&utm_campaign=digiloans",
      image: "./images/flexiloans-logo.png",
    },
    {
      name: "Protium",
      link: "https://dbl.protium.co.in/?utm_source=buddyloans&utm_medium=digital&utm_campaign=digiloans",
      image: "./images/PROTIUM_86dac673b6.avif",
    },
    {
      name: "Poonawalla Business Loan",
      link: "https://business-loans.poonawallafincorp.com/?redirectto=primebl&utm_DSA_Code=PKA00192&UTM_Partner_Name=BVALUE_SERVICES_PRIVATE_LIMITED&UTM_Partner_ReferenceID=digiloans",
      image: "./images/punewala.svg",
    },
  ],
  emi: [
    {
      name: "Bajaj Insta EMI",
      link: "https://www.bajajfinserv.in/webform/emicard/login?utm_source=expartner&utm_medium=DSA&utm_campaign=digiloans&clickid={click_id}",
      image: "./images/Daco_4954654.png",
    },
    {
      name: "IDFC Credit Card",
      link: "https://www.idfcfirstbank.com/credit-card/ntb-diy/apply?utm_source=Partner&utm_medium=BANK_BDL&utm_campaign=digiloans",
      image: "./images/IDFC_First_Bank_d21b7112b9.avif",
    },
  ],
  credit: [
    {
      name: "BOBCARD Uni GoldX Credit Card",
      image: "./images/1746093573_1737534219_logo_uni_dbc4c88973+(2).webp",
      link: "available",
    },
    {
      name: "Scapia Federal Bank Credit Card",
      image:
        "./images/1754650132_6793e2d597822ee8ea04b166_6788074f8d3d013d2d8bbbcb_6549e2ce3c0f09f5a403dfd0_scapia.webp",
      link: "available",
    },
  ],
};

// Fixed sample data structure
const sampleData = {
  personal: [
    {
      amount: "₹ 5,00,000",
      rate: "18%",
      fee: "2% to 4% + GST",
      tenure: "3 Years",
      income: "20,000 & above",
      age: "22 - 58 years",
      productBenefits: [
        "Quick approval within 24-48 hours",
        "No collateral or guarantor required",
        "Flexible repayment options available",
        "Minimal documentation required",
        "Competitive interest rates starting from 12%",
        "Online application process",
        "Pre-closure allowed without penalty after 6 months",
      ],
      whomToSale: [
        "Salaried professionals with stable income",
        "Individuals seeking debt consolidation",
        "People planning home renovation or wedding",
        "Medical emergency funding requirements",
        "Students for education expenses",
        "Small business owners for working capital",
        "Individuals with good credit score (650+)",
      ],
    },
    {
      amount: "₹ 10,00,000",
      rate: "15%",
      fee: "1% to 3% + GST",
      tenure: "5 Years",
      income: "25,000 & above",
      age: "21 - 60 years",
      productBenefits: [
        "Higher loan amount up to ₹10 lakhs",
        "Longer tenure for lower EMI",
        "Digital KYC process available",
        "Instant approval for eligible customers",
        "Zero processing fees for select customers",
        "Balance transfer facility available",
        "Top-up loans on existing loans",
      ],
      whomToSale: [
        "High-income professionals and executives",
        "Individuals planning major life events",
        "Property purchase or down payment needs",
        "Business expansion requirements",
        "Luxury purchase financing",
        "Investment opportunities seekers",
        "Customers with excellent credit history",
      ],
    },
    {
      amount: "₹ 2,00,000",
      rate: "24%",
      fee: "2% to 5% + GST",
      tenure: "2 Years",
      income: "15,000 & above",
      age: "23 - 55 years",
      productBenefits: [
        "Quick cash for immediate needs",
        "Minimal income requirements",
        "Fast approval process (same day)",
        "Mobile app for easy management",
        "Flexible EMI dates",
        "No usage restrictions",
        "Part payment facility available",
      ],
      whomToSale: [
        "Young professionals starting career",
        "Individuals with urgent cash needs",
        "Small ticket personal expenses",
        "Emergency medical situations",
        "Travel and vacation funding",
        "Festival and shopping expenses",
        "Customers new to credit market",
      ],
    },
  ],
  business: [
    {
      amount: "₹ 50,00,000",
      rate: "12%",
      fee: "1% to 2% + GST",
      tenure: "5 Years",
      turnover: "10 Lakhs & above",
      age: "2+ years",
      productBenefits: [
        "High loan amount for business growth",
        "Attractive interest rates for businesses",
        "Flexible repayment schedules",
        "Working capital and term loan options",
        "Digital loan management platform",
        "Dedicated relationship manager",
        "Quick turnaround time for approvals",
      ],
      whomToSale: [
        "Established businesses with good turnover",
        "Manufacturing and trading companies",
        "Service sector businesses",
        "Expansion and modernization needs",
        "Equipment purchase requirements",
        "Inventory financing needs",
        "Businesses with strong financials",
      ],
    },
    {
      amount: "₹ 25,00,000",
      rate: "14%",
      fee: "1.5% to 3% + GST",
      tenure: "3 Years",
      turnover: "5 Lakhs & above",
      age: "1+ years",
      productBenefits: [
        "Suitable for medium-scale businesses",
        "Competitive pricing structure",
        "Minimal documentation process",
        "Collateral-free options available",
        "Business advisory services included",
        "Online application and tracking",
        "Seasonal payment flexibility",
      ],
      whomToSale: [
        "Growing small and medium enterprises",
        "Retail and wholesale businesses",
        "Professional service providers",
        "Technology and IT companies",
        "Healthcare and education services",
        "Restaurant and hospitality sector",
        "Businesses seeking working capital",
      ],
    },
  ],
  emi: [
    {
      limit: "₹ 3,00,000",
      rate: "13%",
      fee: "Nil",
      validity: "Lifetime",
      income: "25,000 & above",
      age: "21 - 65 years",
      productBenefits: [
        "Interest-free EMI options available",
        "Wide network of partner merchants",
        "Instant approval at point of sale",
        "No annual fees or charges",
        "Flexible EMI tenure options",
        "Online and offline usage",
        "Special discounts and offers",
      ],
      whomToSale: [
        "Customers preferring EMI purchases",
        "Tech-savvy millennials and Gen-Z",
        "Regular online shoppers",
        "Appliance and electronics buyers",
        "Fashion and lifestyle enthusiasts",
        "Travel and experience seekers",
        "Customers avoiding credit card debt",
      ],
    },
    {
      limit: "₹ 5,00,000",
      rate: "11%",
      fee: "₹ 999",
      validity: "Lifetime",
      income: "30,000 & above",
      age: "21 - 60 years",
      productBenefits: [
        "Higher credit limit availability",
        "Premium merchant partnerships",
        "Attractive reward programs",
        "Priority customer service",
        "Extended warranty benefits",
        "Zero down payment options",
        "Insurance coverage included",
      ],
      whomToSale: [
        "High-income professionals",
        "Frequent high-value purchasers",
        "Brand-conscious customers",
        "Luxury goods buyers",
        "Home furnishing enthusiasts",
        "Gadget and technology lovers",
        "Customers seeking premium benefits",
      ],
    },
  ],
  credit: [
    {
      limit: "₹ 3,00,000",
      rate: "13%",
      fee: "Nil",
      validity: "Lifetime",
      income: "25,000 & above",
      age: "21 - 65 years",
      productBenefits: [
        "Lifetime free credit card",
        "Attractive welcome bonus",
        "Cashback on all purchases",
        "Lounge access benefits",
        "Fuel surcharge waiver",
        "Online transaction security",
        "24/7 customer support",
      ],
      whomToSale: [
        "First-time credit card applicants",
        "Customers seeking no annual fee cards",
        "Regular spenders across categories",
        "Travel enthusiasts",
        "Online shopping lovers",
        "Fuel expense heavy customers",
        "Credit building aspirants",
      ],
    },
    {
      limit: "₹ 3,00,000",
      rate: "13%",
      fee: "Nil",
      validity: "Lifetime",
      income: "25,000 & above",
      age: "21 - 65 years",
      productBenefits: [
        "Travel-focused rewards program",
        "International usage benefits",
        "Dining and entertainment offers",
        "Airport lounge access",
        "Travel insurance coverage",
        "Foreign exchange benefits",
        "Milestone bonus rewards",
      ],
      whomToSale: [
        "Frequent travelers and explorers",
        "International business travelers",
        "Dining and entertainment enthusiasts",
        "Premium lifestyle customers",
        "High-spending professionals",
        "Travel insurance seekers",
        "Reward optimization enthusiasts",
      ],
    },
  ],
};

// Fixed helper function
function getRandomData(type, index) {
  const dataArray = sampleData[type];
  if (!dataArray || dataArray.length === 0) {
    console.error(`No sample data found for type: ${type}`);
    return {};
  }
  return dataArray[index % dataArray.length];
}

// Fixed createLoanCard function
function createLoanCard(vendor, index, type) {
  const data = getRandomData(type, index);
  const isComingSoon = vendor.link === "COMING SOON" || !vendor.link;
  const cardId = `${type}-${index}`;

  return `
    <div class="loan-card p-4 mb-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div class="d-flex align-items-center">
          <img src="${vendor.image}" alt="${
    vendor.name
  }" class="vendor-logo me-3" style="width:150px;height:50px; object-fit:contain;border-radius:8px;">
          <h5 class="mb-0">${vendor.name}</h5>
        </div>
        
        <button class="btn apply-btn ${isComingSoon ? "disabled" : ""}" 
          onclick="${
            isComingSoon
              ? ""
              : `openLoanModal('${vendor.name.replace(/'/g, "\\'")}', '${
                  data.rate ? data.rate.replace(/'/g, "\\'") : "Variable Rate"
                }')`
          }"
          ${isComingSoon ? "disabled" : ""}>
          ${isComingSoon ? "Coming Soon" : "Apply Now"}
        </button>
      </div>

      <div class="row loan-details mb-4">
        <div class="col-6 col-md-3 mb-3">
          <div class="detail-label">${
            type === "business"
              ? "Loan Amount:"
              : type === "emi" || type === "credit"
              ? "Credit Limit:"
              : "Loan Amount:"
          }</div>
          <div class="detail-value">upto ${
            type === "emi" || type === "credit"
              ? data.limit || data.amount || "₹3,00,000"
              : data.amount || "₹5,00,000"
          }</div>
        </div>
        <div class="col-6 col-md-3 mb-3">
          <div class="detail-label">Interest Rate:</div>
          <div class="detail-value">Starting from ${data.rate || "13%"}</div>
        </div>
        <div class="col-6 col-md-3 mb-3">
          <div class="detail-label">Processing Fee:</div>
          <div class="detail-value">${data.fee || "Nil"}</div>
        </div>
        <div class="col-6 col-md-3 mb-3">
          <div class="detail-label">${
            type === "emi" || type === "credit" ? "Validity:" : "Tenure:"
          }</div>
          <div class="detail-value">${
            type === "emi" || type === "credit"
              ? data.validity || "Lifetime"
              : data.tenure || "3 Years"
          }</div>
        </div>
      </div>

      <div class="d-flex justify-content-between align-items-center">
        <p class="eligibility-text mb-0">
          View your ${
            type === "credit" ? "card" : "loan"
          } eligibility quickly—just a few simple fields required!
        </p>
        <a class="details-toggle" data-bs-toggle="collapse" href="#collapse-${cardId}" role="button">
          Detailed Offers <i class="fas fa-chevron-down"></i>
        </a>
      </div>

      <div class="collapse" id="collapse-${cardId}">
        <div class="collapse-content p-3">
          <div class="row">
            <div class="col-md-6">
              <div class="d-flex justify-content-between mb-2">
                <span class="fw-medium">Processing Fee:</span>
                <span class="text-muted">${data.fee || "Nil"}</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span class="fw-medium">${
                  type === "credit" ? "Annual Charges:" : "Prepayment Charges:"
                }</span>
                <span class="text-success">Nil</span>
              </div>
            </div>
            <div class="col-md-6">
              <div class="d-flex justify-content-between mb-2">
                <span class="fw-medium">${
                  type === "business" ? "Business Age:" : "Age:"
                }</span>
                <span class="text-muted">${
                  type === "business"
                    ? data.age || "2+ years"
                    : data.age || "21 - 65 years"
                }</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span class="fw-medium">${
                  type === "business" ? "Min Turnover:" : "Min Income:"
                }</span>
                <span class="text-muted">${
                  type === "business"
                    ? data.turnover || "10 Lakhs & above"
                    : data.income || "25,000 & above"
                }</span>
              </div>
            </div>
          </div>
          
          <!-- Product Benefits Section -->
          ${
            data.productBenefits
              ? `
            <div class="benefits mt-4 pt-3 border-top">
              <h6 class="fw-bold mb-3 text-primary">
                <i class="fas fa-gift me-2"></i>Product Benefits
              </h6>
              <div class="row">
                <div class="col-12">
                  <ul class="benefits-list mb-0" style="list-style: none; padding-left: 0;">
                    ${data.productBenefits
                      .map(
                        (benefit) => `
                      <li class="mb-2" style="position: relative; padding-left: 24px;">
                        <i class="fas fa-check-circle text-success" style="position: absolute; left: 0; top: 2px; font-size: 14px;"></i>
                        <span style="font-size: 14px; line-height: 1.5;">${benefit}</span>
                      </li>
                    `
                      )
                      .join("")}
                  </ul>
                </div>
              </div>
            </div>
          `
              : ""
          }
          
          <!-- Whom to Sale Section -->
          ${
            data.whomToSale
              ? `
            <div class="target-customers mt-4 pt-3 border-top">
              <h6 class="fw-bold mb-3 text-info">
                <i class="fas fa-users me-2"></i>Whom to Sale
              </h6>
              <div class="row">
                <div class="col-12">
                  <ul class="target-list mb-0" style="list-style: none; padding-left: 0;">
                    ${data.whomToSale
                      .map(
                        (target) => `
                      <li class="mb-2" style="position: relative; padding-left: 24px;">
                        <i class="fas fa-user-check text-info" style="position: absolute; left: 0; top: 2px; font-size: 14px;"></i>
                        <span style="font-size: 14px; line-height: 1.5;">${target}</span>
                      </li>
                    `
                      )
                      .join("")}
                  </ul>
                </div>
              </div>
            </div>
          `
              : ""
          }
        </div>
      </div>
    </div>
  `;
}

// Fixed renderLoanCards function
function renderLoanCards(type, containerId) {
  console.log(`Rendering ${type} cards in container: ${containerId}`);

  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container not found: ${containerId}`);
    return;
  }

  const vendors = loanData[type];
  if (!vendors || vendors.length === 0) {
    console.error(`No vendors found for type: ${type}`);
    container.innerHTML =
      '<div class="text-center p-4">No loan options available at the moment.</div>';
    return;
  }

  try {
    container.innerHTML = vendors
      .map((vendor, index) => createLoanCard(vendor, index, type))
      .join("");
    console.log(`Successfully rendered ${vendors.length} ${type} cards`);
  } catch (error) {
    console.error(`Error rendering ${type} cards:`, error);
    container.innerHTML =
      '<div class="text-center p-4 text-danger">Error loading loan options. Please try again later.</div>';
  }
}

// Loan Modal Functions
function openLoanModal(vendorName, interestRate) {
  const modal = document.getElementById("loanModal");
  if (modal) {
    modal.style.display = "block";
    document.body.classList.add("no-scroll");

    const modalVendorName = document.getElementById("modalVendorName");
    const modalInterestRate = document.getElementById("modalInterestRate");

    if (modalVendorName) modalVendorName.textContent = vendorName;
    if (modalInterestRate) modalInterestRate.textContent = interestRate;
  }
}

function closeLoanModal() {
  const modal = document.getElementById("loanModal");
  if (modal) {
    modal.style.display = "none";
    document.body.classList.remove("no-scroll");
  }
}

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing loan cards...");

  // Render all loan card types
  renderLoanCards("personal", "personalLoansContainer");
  renderLoanCards("business", "businessLoansContainer");
  renderLoanCards("emi", "emiCardsContainer");
  renderLoanCards("credit", "creditCardsContainer");

  // Event listeners for collapse toggles
  document.addEventListener("shown.bs.collapse", function (e) {
    const toggle = document.querySelector(`[href="#${e.target.id}"]`);
    if (toggle) {
      toggle.innerHTML = 'Hide Details <i class="fas fa-chevron-up"></i>';
    }
  });

  document.addEventListener("hidden.bs.collapse", function (e) {
    const toggle = document.querySelector(`[href="#${e.target.id}"]`);
    if (toggle) {
      toggle.innerHTML = 'Detailed Offers <i class="fas fa-chevron-down"></i>';
    }
  });

  // Modal event listeners
  const modal = document.getElementById("loanModal");
  if (modal) {
    window.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeLoanModal();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeLoanModal();
      }
    });
  }

  // Form submission handler
  const form = document.getElementById("loanApplicationForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Application submitted! Thank you.");
      closeLoanModal();
      form.reset();
    });
  }
});

// Make functions globally available
window.openLoanModal = openLoanModal;
window.closeLoanModal = closeLoanModal;
window.renderLoanCards = renderLoanCards;
