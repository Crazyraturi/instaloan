// ================= Smooth Scrolling =================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ================= Loan Calculator =================
 // Currency formatting functions
        function formatCurrency(amount) {
            return "₹" + amount.toLocaleString("en-IN");
        }

        function formatLargeAmount(amount) {
            if (amount >= 1e7) return `₹${(amount / 1e7).toFixed(1)}Cr`;
            if (amount >= 1e5) return `₹${(amount / 1e5).toFixed(1)}L`;
            return formatCurrency(amount);
        }

        // EMI calculation function
        function calculateEMI(principal, rate, tenure) {
            const monthlyRate = rate / (12 * 100);
            if (monthlyRate === 0) return principal / tenure;
            return (
                (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
                (Math.pow(1 + monthlyRate, tenure) - 1)
            );
        }

        // Chart update function
        function updateChart(principal, interest) {
            const principalArc = document.getElementById("principalArc");
            const interestArc = document.getElementById("interestArc");

            if (!principalArc || !interestArc) return;

            const total = principal + interest;
            if (total <= 0) return;

            const circumference = 2 * Math.PI * 80;
            const principalLength = (principal / total) * circumference;
            const interestLength = (interest / total) * circumference;

            principalArc.style.strokeDasharray = `${principalLength} ${circumference}`;
            principalArc.style.strokeDashoffset = "0";

            interestArc.style.strokeDasharray = `${interestLength} ${circumference}`;
            interestArc.style.strokeDashoffset = `-${principalLength}`;
        }

        // Parse number from formatted string
        function parseAmount(value) {
            if (typeof value === 'string') {
                return parseFloat(value.replace(/[^\d.]/g, '')) || 0;
            }
            return parseFloat(value) || 0;
        }

        // Main calculation and update function
        function updateCalculations() {
            // Get values from sliders and inputs
            const loanAmountSlider = document.getElementById("loanAmount");
            const tenureSlider = document.getElementById("tenure");
            const interestRateSlider = document.getElementById("interestRate");

            if (!loanAmountSlider || !tenureSlider || !interestRateSlider) return;

            const principal = parseFloat(loanAmountSlider.value) || 0;
            const tenure = parseInt(tenureSlider.value) || 0;
            const rate = parseFloat(interestRateSlider.value) || 0;

            // Update display elements
            const loanAmountDisplay = document.getElementById("loanAmountDisplay");
            const tenureDisplay = document.getElementById("tenureDisplay");
            const interestRateDisplay = document.getElementById("interestRateDisplay");
            const monthlyEMI = document.getElementById("monthlyEMI");
            const totalInterest = document.getElementById("totalInterest");
            const totalPayable = document.getElementById("totalPayable");

            if (loanAmountDisplay) loanAmountDisplay.textContent = formatLargeAmount(principal);
            if (tenureDisplay) {
                tenureDisplay.textContent = tenure > 12
                    ? `${Math.floor(tenure / 12)} Years ${tenure % 12} Months`
                    : `${tenure} Months`;
            }
            if (interestRateDisplay) interestRateDisplay.textContent = `${rate}%`;

            // Calculate EMI
            const emi = calculateEMI(principal, rate, tenure);
            const totalAmount = emi * tenure;
            const totalInterestAmount = totalAmount - principal;

            // Update result displays
            if (monthlyEMI) monthlyEMI.textContent = formatCurrency(Math.round(emi));
            if (totalInterest) totalInterest.textContent = formatLargeAmount(Math.round(totalInterestAmount));
            if (totalPayable) totalPayable.textContent = formatLargeAmount(Math.round(totalAmount));

            // Update chart
            updateChart(principal, totalInterestAmount);
        }

        // Sync input field with slider
        function syncInputWithSlider(inputId, sliderId, formatter = null) {
            const input = document.getElementById(inputId);
            const slider = document.getElementById(sliderId);

            if (!input || !slider) return;

            // Update slider when input changes
            input.addEventListener('input', function() {
                let value = parseAmount(this.value);
                const min = parseFloat(slider.min);
                const max = parseFloat(slider.max);

                // Clamp value to slider range
                value = Math.max(min, Math.min(max, value));
                
                slider.value = value;
                this.value = formatter ? formatter(value) : value;
                updateCalculations();
            });

            // Update input when slider changes
            slider.addEventListener('input', function() {
                const value = parseFloat(this.value);
                input.value = formatter ? formatter(value) : value;
                updateCalculations();
            });

            // Format input on blur
            input.addEventListener('blur', function() {
                const value = parseAmount(this.value);
                this.value = formatter ? formatter(value) : value;
            });
        }

        // Custom formatter for loan amount (removes currency symbols for input)
        function loanAmountFormatter(value) {
            return Math.round(value).toString();
        }

        // Apply for loan function
        function applyForLoan() {
            alert('Redirecting to loan application form...');
        }

        // Initialize everything when DOM is ready
        document.addEventListener("DOMContentLoaded", function() {
            // Sync inputs with sliders
            syncInputWithSlider('loanAmountInput', 'loanAmount', loanAmountFormatter);
            syncInputWithSlider('tenureInput', 'tenure');
            syncInputWithSlider('interestRateInput', 'interestRate');

            // Initial calculation
            updateCalculations();

            // Set initial input values
            document.getElementById('loanAmountInput').value = document.getElementById('loanAmount').value;
            document.getElementById('tenureInput').value = document.getElementById('tenure').value;
            document.getElementById('interestRateInput').value = document.getElementById('interestRate').value;
        });

// ================= DOM Ready =================
document.addEventListener("DOMContentLoaded", () => {
  console.log("App Initialized");

  // Loan Calculator listeners
  document
    .getElementById("loanAmount")
    ?.addEventListener("input", updateCalculations);
  document
    .getElementById("tenure")
    ?.addEventListener("input", updateCalculations);
  document
    .getElementById("interestRate")
    ?.addEventListener("input", updateCalculations);

  updateCalculations();

  // Modal close listeners
  window.addEventListener("click", (e) => {
    const modal = document.getElementById("loanModal");
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Carousel Init
  const loanCarousel = document.querySelector("#loanCarousel");
  if (loanCarousel && typeof bootstrap !== "undefined") {
    const bsLoanCarousel = new bootstrap.Carousel(loanCarousel, {
      interval: 4000,
      wrap: true,
    });
    loanCarousel.addEventListener("mouseenter", () => bsLoanCarousel.pause());
    loanCarousel.addEventListener("mouseleave", () => bsLoanCarousel.cycle());
  }
  if (
    document.querySelector("#featuresCarousel") &&
    typeof bootstrap !== "undefined"
  )
    new bootstrap.Carousel("#featuresCarousel", { interval: 8000, wrap: true });
  if (
    document.querySelector("#customerCarousel") &&
    typeof bootstrap !== "undefined"
  )
    new bootstrap.Carousel("#customerCarousel", { interval: 5000, wrap: true });

  // Feature card click effect
  document.querySelectorAll(".feature-card").forEach((card) => {
    card.addEventListener("click", () => {
      card.style.transform = "scale(0.95)";
      setTimeout(() => (card.style.transform = ""), 150);
    });
  });

  // Testimonials
  initializeTestimonials();

  // Show/hide back to top button on scroll
  window.addEventListener("scroll", function () {
    const btn = document.getElementById("backToTopBtn");
    if (window.scrollY > 300) {
      btn.style.display = "flex";
    } else {
      btn.style.display = "none";
    }
  });

  // Hide by default
  document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("backToTopBtn");
    if (btn) btn.style.display = "none";
  });
});

// ================= Testimonials =================
const testimonialData = [
  {
    name: "Rohit verma",
    role: "Marketing Manager",
    image:
      "https://i.pinimg.com/736x/f6/8b/07/f68b07afcf0acea994b7681e9caaff35.jpg",
    text: "I was impressed by the clarity and speed of service. Comparing offers from multiple lenders helped me find the best deal.",
  },
  {
    name: "Shubhamita Das",
    role: "Business Owner",
    image:
      "https://img.freepik.com/free-photo/indian-woman-posing-cute-stylish-outfit-camera-smiling_482257-122351.jpg?semt=ais_hybrid&w=740&q=80",
    text: "The team exceeded our expectations with their professionalism and quick turnaround. Highly recommended.",
  },
  {
    name: "Rahul sharma",
    role: "Product Director",
    image:
      "https://plus.unsplash.com/premium_photo-1682089787056-9ac0c78a2ac2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW5kaWFuJTIwcGVvcGxlfGVufDB8fDB8fHww",
    text: "Working with this company transformed our business operations. Customer-first mentality sets them apart.",
  },
];

let currentTestimonialIndex = 0;

function updateTestimonialDisplay() {
  const current = testimonialData[currentTestimonialIndex];
  document.querySelector(".testimonial-client-info h3").textContent =
    current.name;
  document.querySelector(".testimonial-client-role").textContent = current.role;
  document.querySelector(".testimonial-avatar-image").src = current.image;
  document.querySelector(".testimonial-review-text").textContent = current.text;
  document
    .querySelectorAll(".testimonial-nav-dot")
    .forEach((dot, i) =>
      dot.classList.toggle("active-dot", i === currentTestimonialIndex)
    );
}

function nextTestimonial() {
  currentTestimonialIndex =
    (currentTestimonialIndex + 1) % testimonialData.length;
  updateTestimonialDisplay();
}

function prevTestimonial() {
  currentTestimonialIndex =
    (currentTestimonialIndex - 1 + testimonialData.length) %
    testimonialData.length;
  updateTestimonialDisplay();
}

function initializeTestimonials() {
  document
    .getElementById("nextBtn")
    ?.addEventListener("click", nextTestimonial);
  document
    .getElementById("prevBtn")
    ?.addEventListener("click", prevTestimonial);

  document.querySelectorAll(".testimonial-nav-dot").forEach((dot, i) =>
    dot.addEventListener("click", () => {
      currentTestimonialIndex = i;
      updateTestimonialDisplay();
    })
  );

  setInterval(nextTestimonial, 6000);
  updateTestimonialDisplay();
}

// ================= Typing Effect =================
document.addEventListener("DOMContentLoaded", function () {
  const dlTypingWords = [
    "Personal Loan",
    "High Payouts & Fast Disbursement",
    "Home Loan",
    "Business Loan",
    "Car Loan",
    "Education Loan",
    "Insurance Needs",
    "Investment Plans",
    "Credit Cards",
    "Quick Cash",
  ];

  let dlCurrentWordIndex = 0;
  let dlCurrentCharIndex = 0;
  let dlIsDeleting = false;
  const dlTypedElement = document.getElementById("dlTypedText");

  function dlTypeEffect() {
    if (!dlTypedElement) return;
    const dlCurrentWord = dlTypingWords[dlCurrentWordIndex];

    if (!dlIsDeleting) {
      dlTypedElement.textContent = dlCurrentWord.substring(
        0,
        dlCurrentCharIndex + 1
      );
      dlCurrentCharIndex++;

      if (dlCurrentCharIndex === dlCurrentWord.length) {
        dlIsDeleting = true;
        setTimeout(dlTypeEffect, 2000);
        return;
      }
    } else {
      dlTypedElement.textContent = dlCurrentWord.substring(
        0,
        dlCurrentCharIndex - 1
      );
      dlCurrentCharIndex--;

      if (dlCurrentCharIndex === 0) {
        dlIsDeleting = false;
        dlCurrentWordIndex = (dlCurrentWordIndex + 1) % dlTypingWords.length;
        setTimeout(dlTypeEffect, 500);
        return;
      }
    }

    const dlTypingSpeed = dlIsDeleting ? 100 : 150;
    setTimeout(dlTypeEffect, dlTypingSpeed);
  }

  dlTypeEffect();
});

// ================= FAQ Toggle =================
function toggleFaq(link) {
  const faq = link.nextElementSibling;
  if (faq.style.display === "none" || faq.style.display === "") {
    faq.style.display = "block";
    link.textContent = "Hide Details -";
  } else {
    faq.style.display = "none";
    link.textContent = "Detailed Offers +";
  }
}

// ================= Fixed Loan Card System =================

const loanData = {
  personal: [
    {
      name: "InCred",
      link: "https://www.incred.com/personal-loan/?partnerId=8313827854371024P&utm_source=DSA&utm_medium=digiloans&utm_campaign=Buddyloan",
      image: "./images/increed.svg",
    },
    {
      name: "IDFC FIRST Bank",
      link: "https://www.idfcfirstbank.com/personal-loan/apply-online?utm_source=Partner&utm_medium=DSA&utm_campaign=digiloans",
      image: "./images/IDFC_First_Bank_d21b7112b9.avif",
    },
  ],

  instant: [
    {
      name: "Poonawalla Fincorp",
      link: "https://instant-pocket-loan.poonawallafincorp.com/?utm_DSA_Code=PKA00192&UTM_Partner_Name=BuddyLoan&UTM_Partner_Medium=digiloans&UTM_Partner_AgentCode=DSA&UTM_Partner_ReferenceID=PK2002",
      image: "./images/punewala.svg",
    },
    {
      name: "Aditya Birla Finance",
      link: "https://abfl.finbox.in/?partnerCode=BS_LIICJW&agentCode=digiloans&productType=personal_loan",
      image: "./images/Adity_Birla_Capital_Finance_dbcf07676a.avif",
    },

    {
      name: "Prefr",
      link: "https://marketplace.prefr.com/buddyloan?utm_source=buddyloan&utm_medium=digiloans&utm_content=content1&utm_campaign=DSA",
      image: "./images/prif.avif",
    },
    {
      name: "Unity SFB",
      link: "https://loans.theunitybank.com/unity-pl-ui/page/exclusion/login/logindetails?utm_source=buddyloan&utm_medium=digiloans&utm_campaign=DSA",
      image: "./images/Unity_Small_Finnace_Bank_e7d2ec53d7.avif",
    },
    {
      name: "MoneyView",
      link: "https://moneyview.in/personal-loan?utm_source=bl&utm_medium=digiloans&utm_campaign=dsa",
      image: "./images/moneyview.svg",
    },
    {
      name: "Kissht",
      link: "https://kissht.onelink.me/I5a1?af_xp=custom&pid=Buddyloan01&c=Buddyloan01&is_retargeting=true&af_reengagement_window=3d&af_sub1=digiloans&af_click_lookback=30d",
      image: "./images/kissht.webp",
    },
    {
      name: "KreditBee",
      link: "https://loan.indiasales.club?productCode=KREDITBEE&journeyId=1&shortCode=1i2PwQUfAwmwtH3etD4R6&subCode=l&productTypeId=269&productType=Personal%20Loan&memberId=4HC66777&transitionId=2e39ea5d-e3db-4159-91c3-0631353ebeb3",
      image: "./images/kriditbee.svg",
    },
    {
      name: "Lendingplate",
      link: "https://loan.indiasales.club?productCode=LPL&journeyId=1&shortCode=1i2PwQUfAwmwtH3etD4R6&subCode=l&productTypeId=480&productType=Personal%20Loan&memberId=4HC66777&transitionId=2e39ea5d-e3db-4159-91c3-0631353ebeb3",
      image: "./images/lendingplate.png",
    },
    {
      name: "InCred",
      link: "https://www.incred.com/personal-loan/?partnerId=8313827854371024P&utm_source=DSA&utm_medium=digiloans&utm_campaign=Buddyloan",
      image: "./images/increed.svg",
    },
  ],
  business: [
    {
      name: "Flexiloans",
      link: "https://loans.flexiloans.com/?nlp=1&partnerCode=64f1be98nfwae&utm_source=partner&utm_medium=buddyloan&utm_campaign=digiloans",
      image: "./images/flexiloans-logo.png",
    },
    {
      name: "Lendingplate",
      link: "https://loan.indiasales.club?productCode=LPL&journeyId=1&shortCode=1i2PwQUfAwmwtH3etD4R6&subCode=l&productTypeId=480&productType=Personal%20Loan&memberId=4HC66777&transitionId=2e39ea5d-e3db-4159-91c3-0631353ebeb3",
      image: "./images/lendingplate.png",
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
    {
      name: "IndusInd Bank Tiger Credit Card",
      image: "./images/1694242872_IndusInd_re.svg",
      link: "available",
    },
    {
      name: "AU Small Finance Bank Credit Card",
      image: "./images/ausmall.webp",
      link: "available",
    },
    {
      name: "ICICI Credit Card",
      image: "./images/icici.webp",
      link: "available",
    },
    {
      name: "IndianOil RBL Bank XTRA Credit_Card",
      image: "./images/1749719799_1746799220_1746712698_1742476891_RBL.webp",
      link: "available",
    },
    {
      name: "YES Bank POP-CLUB Credit Card",
      image: "./images/1737437626_OG_POP_Logo-02.webp",
      link: "available",
    },
    {
      name: "BPCL SBI Credit_Card",
      image: "./images/sbicard.webp",
      link: "available",
    },
    {
      name: "RBL Shoprite Credit_Card",
      image: "./images/1749719799_1746799220_1746712698_1742476891_RBL.webp",
      link: "available",
    },
    {
      name: "KIWI Rupay Credit Card",
      image: "./images/kiwi.webp",
      link: "available",
    },

    {
      name: "Tata Neu HDFC Bank Credit_Card",
      image: "./images/tatneu.webp",
      link: "available",
    },
    {
      name: "Axis Life Time Free Card",
      image: "./images/axisbank.webp",
      link: "available",
    },
    {
      name: "Axis Bank Credit Card",
      image: "./images/axisbank.webp",
      link: "available",
    },
    {
      name: "LIC Axis Bank Credit Card",
      image: "./images/1689764591_LIC+AXIS+BANK+Credit+Card_600+x+600-05.webp",
      link: "available",
    },

    {
      name: "SBI QDE Credit Card",
      image: "./images/sbicard.webp",
      link: "available",
    },
    {
      name: "Jupiter Rupay Credit Card",
      image:
        "./images/1752327188_1704698180_Jupiter+Edge+Rupay+CC_600+x+600-07.svg",
      link: "available",
    },
    {
      name: "CASHBACK SBI Credit_Card",
      image: "./images/sbicard.webp",
      link: "available",
    },
    {
      name: "SBI Credit Card",
      image: "./images/sbicard.webp",
      link: "available",
    },
  ],
};

// Fixed sample data structure
const sampleData = {
  personal: [
    {
      amount: "₹ 2,00,00,000",
      rate: "10.99%",
      fee: "1.5% to 2% + + GST",
      tenure: "7 Years",
      income: "	20,000 & above",
      age: "	23 - 60 years",
      productBenefits: [
        "🌐 Instant Online Application",
        "💸 Collateral-Free Loan",
        "⏱ Instant Loan Approval",
        "👉🏻 Same Day Disbursal",
      ],
      whomToSale: [
        "1. Available for both salaried and self employed",
        "2. Minimum Monthly Income:",
        "(a) Salaried: ₹25,000s",
        "(b) Self Employed: ₹25,000",
        "3. Age: 23-56 years",
        "Festival and shopping expenses",
        "5. Available in limited location",
      ],
    },
    {
      amount: "₹ 1,00,00,000",
      rate: "10.99%",
      fee: "1.5% to 2% + GST",
      tenure: "7 Years",
      income: "	20,000 & above",
      age: "	23 - 60 years",
      productBenefits: [
        "💼 Get an Instant Personal Loan from IDFC First Bank",
        "🌟 Approved Loan Offer upto ₹10 Lakhs",
        "💸 Withdraw funds with flexible EMI dates",
        "🔓 Repay anytime with ZERO foreclosure charges",
        "📉 ROI Starting from 9.99% P.A",
        "📆 Flexible Tenure: 9 - 60 Months",
      ],
      whomToSale: [
        "1. Age: 25- 60 Years",
        "2. CIBIL Score Above 730",
        "3. Processing fees of up to 2% will be deducted from the loan amount at the time of disbursal.",
        "4. Available for both salaried and self-employed individuals",
        "5. List of documents needed: Display your PAN card for the VKYC verification.",
        "6. NTB (New to Bank): Customer shouldn’t have any relations with IDFC First Bank (Savings A/c, Loan, Credit Card etc)",
      ],
    },
  ],
  instant: [
    {
      amount: "₹ 5,00,000",
      rate: "18%",
      fee: "2% to 4% + GST",
      tenure: "3 Years",
      income: "20,000 & above",
      age: "22 - 58 years",
      productBenefits: [
        "💸 Get Instant Personal Loan Online Upto ₹5 Lakhs",
        "🌐 100% Online Application",
        "🚫 Zero Hidden Charges",
        "🔓 Collateral-Free",
        "📄 Minimal Documentation",
        "✅ No Foreclosure Charges (if paid from own sources)",
      ],
      whomToSale: [
        "Age: Between 24 and 55 years",
        "CIBIL Score 720 +",
        "Citizenship: The applicant must be an Indian citizen.",
        "Available for both Salaried and Self-Employed",
        "Annual Household Income: Minimum annual household income (declared) must be ₹3 lakh.",
        "KYC Documents: PAN Card/Aadhaar Card/Driving License/Voter ID/Passport",
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
        "📱 100% digital application and verification Process",
        "🗓 Flexible tenure from 12 to 48 Months",
        "💸 Instant Loan Up to ₹5 Lakhse",
        "🙆🏻‍♂️ Only for salaried employees",
        "⏱ Instant Disbursal ",
      ],
      whomToSale: [
        "1. Age: 23 to 60 years",
        "2. For salaried employees Only",
        "3.Verification by EPFO and Work Email OTP. ",
        "4.3. Credit Score >725",
        "5. Min Monthly Income:",
        "- Tier 1 & Tier 2 >= ₹30000",
        "- Tier 3 & Tier 4 >= ₹25000",
        "6. Delay/overdue on other loan/credit payments should be less than 30 days in last 3 Months",
        "7. Overdue amount for credit card can’t be more than ₹10,000",
        "8. Number of personal loan or credit card enquiries on bureau should be less then 5 in the last 3 months",
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
        "🤠 Loan of up to ₹5 Lakh for - Salaried | Self Employed ",
        "📝 Zero Paperwork",
        "⏱ Instant Loan Approval",
        "👉🏻 Same Day Disbursal",
      ],
      whomToSale: [
        "1. Available for both salaried and self employed",
        "2. Minimum Monthly Income:",
        "(a) Salaried: ₹25,000s",
        "(b) Self Employed: ₹25,000",
        "3. Age: 23-56 years",
        "Festival and shopping expenses",
        "5. Available in limited location",
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
        "- No Paperwork required",
        " No Bank visit required",
        "- Affordable interest rate ",
        "- Loan Amount upto ₹5,00,000",
        "- ROI from 16% ",
      ],
      whomToSale: [
        "- Age: 23 - 55 years",
        "- Both Salaried and Self Employed",
        "- Minimum ₹20,000 per month salary or Turnover of ₹25 lakh per year",
        "- Salary bank credit: Income Statement required for last 6 months",
        "- CIBIL Score >=680",
        "- CIbil Enquiries <=10",
        "- No 90+ DPDs in 12 months or 30+ DPDs in last 3 months",
        "- 18 months bureau vintage/history of the customer",
      ],
    },
    // kissht
    {
      amount: "₹ 2,00,000",
      rate: "24%",
      fee: "2% to 5% + GST",
      tenure: "2 Years",
      income: "15,000 & above",
      age: "23 - 55 years",
      productBenefits: [
        "💸 Flexible loan from ₹5,000 to ₹5 lakh",
        "💰 Loan repayment tenure up to 60 months",
        "⏱ Instant approval in 2 minutes, 24 hour disbursal",
        "🤩 Interest rate starting 1.33% per month",
        "💁🏻‍♀️ Processing Fees: starting from 2%",
      ],
      whomToSale: [
        "1. Available for salaried and self employed both",
        "2. Monthly income > 13,500 (Bank Account)",
        "3. Credit Score > 600",
        "4. Age: 21 to 57 Years",
        "5. No payment delays of more than 15 days in any previous EMIs",
        "6. No settlement/write off in last 36 months",
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
        "COUPON CODE: DSA100 - Up to 100% off on processing fees ",
        "COUPON CODE: KRED50 - Up to 50℅ off on PF for General users",
        "COUPON CODE: EASY50 - Flat 50% off on PF for eligible users",
        "💰 Loans ranging from ₹1,000 to ₹3 Lakhs",
        "🤩 Easy application process.",
        "📱 Digital processing and 10-minute loan disbursal.",
        "💲 Interest rate from 1.02% - 2.49% p.m",
        "😇 No collateral is required to apply for a Personal Loan.",
        "🇮🇳 Service Eligible for PAN India.",
      ],
      whomToSale: [
        "1. Age: 21-50 years",
        "2. Monthly Income should be more than ₹10,000",
        "3. Available only for android users.",
        "4. Loans are available both for salaried & self-employed.",
        "5. List of documents needed- Photograph, Aadhaar card & PAN card.",
        "6. Loan service only for Indian cities.",
        "7. Aadhaar card must be linked with a registered mobile number.",
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
        "🆓 Zero Joining and Annual Fee",
        "🤑 1% assured Gold cashback on your spends*",
        "📈 Unlimited 5% Gold on Amazon, Zomato, Myntra, Zepto and more",
        "🤩 5X more value at Uni Store",
        "💸 Zero Forex Markup",
      ],
      whomToSale: [
        " 1. CIBIL Score above 730",
        "2. Customers should have at least 1 credit card with ₹75,000 limit",
        "3. Existing Yes Bank Credit Card holders are not eligible",
        "4. Age - 21 to 60",
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
        "🆓 Lifetime Free – No joining or annual fees",
        "⛱ Unlimited Domestic Lounge Access – Just ₹10K spend (Visa) or ₹15K (RuPay) per month unlocks access",
        "✈️ 20% Scapia Coins on travel bookings via Scapia app (~4% value)",
        "🛍 10% Coins on All Other Spends (~2% value)",
        "🌍 Zero Forex Markup – No extra charges on international transactions",
        "📲 100% Digital Onboarding & Control via Scapia app",
        "💸 Instant In-App Bill Repayment",
        "🔒 App-Based Control – Set transaction limits & manage permissions",
      ],
      whomToSale: [
        "Age Group: 21 to 65 years (Salaried)",
        "Age Group: 25 to 65 years (Self Employed)",
        "Documents Required:",
        "1. Identity proof: Any one of the documents - Passport, PAN",
        "Card, Ration Card, Aadhaar Card, Voter ID Card, Driving",
        "License, or any other government-approved ID",
        "2. Address proof: Any one of the documents - Telephone bill,",
        "Electricity bill, Passport, Ration card, Rental agreement,",
        "Aadhaar card, or any other government-approved ID",
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
        "💳 Zero joining/annual fee",
        "✈️ Complimentary lounge access (domestic & international)",
        "🎁 Up to 6X reward points",
        "🎬 Free movie ticket (₹500) every 6 months",
        "🛠️ Concierge & Auto Assist services",
      ],
      whomToSale: [
        "- Age: 21 to 60 years (or retirement age)",
        "- Monthly Income: ₹25,000+",
        "- Good credit history",
        "- Salaried and Self-employed (based on bank criteria)",
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
        "💳 Lifetime Free Credit Card (select variants)",
        "🎁 Earn cashback & reward points on every spend",
        "🛍️ Great benefits on shopping, fuel, travel, dining",
        "📲 100% Digital Onboarding with Instant Virtual Card",
        "✨ Card Variants: LIT, Zenith, Altura Plus, Altura",
        "💼 Accepted across all online/offline merchants",
      ],
      whomToSale: [
        "1. Age: ",
        "Salaried: 21 to 60 years",
        "Self-employed: 25 to 65 years",
        "2. Income: ₹25,000+/month",
        "3. Salaried or Self-employed with stable income",
        "4. Good credit score (CIBIL 700+ preferred)",
        "5. PAN & Aadhaar mandatory",
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
        "🛍️ Enjoy discounts on shopping, dining, movies, and more",
        "💵 Enjoy cash rewards and ICICI bank rewards offer",
        "✈️ Get complimentary access to airport lounges",
        "⛽ Discounts on fuel purchases and waiver of fuel surcharge",
        "🎉 No joining and annual fee on selected variants",
      ],
      whomToSale: [
        "1. Credit score above 750 and no negative credit remarks",
        "2. Annual income : 6 lakh and above",
        "3. Age: 21 - 60 years",
        "4. Joining Fee varies from NIL to ₹12,500 as per card variants.",
        "5. Multicarding sourcing is not allowed(no payout for existing ICICI Card holders)",
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
        "🎉 8.5% valueback at at IndianOil Fuel stations",
        "⛽ *250 litres free fuel* annually",
        "🛒15 fuel points/₹100 spent at IndianOil stations",
        "💳 3000 Fuel points as welcome gift",
        "🆓 Annual Fee Waiver on ₹2.75 lakh annual spend",
        "🎁 1 fuel point = ₹0.50",
      ],
      whomToSale: [""],
    },
    {
      limit: "₹ 3,00,000",
      rate: "13%",
      fee: "Nil",
      validity: "Lifetime",
      income: "25,000 & above",
      age: "21 - 65 years",
      productBenefits: [
        "🆓 Lifetime Free UPI Rupay Credit Card",
        "🤩 Joining benefits of Zomato, PharmEasy and Cleartrip",
        "🎁 500 POPcoins on card activation ",
        "🤑 1000 pop coins on linking POP card to POP UPI",
        "💸 1 POPcoin = ₹1 on the POP Shop",
      ],
      whomToSale: [
        "1. CIBIL Score above 730",
        "2. Customers should have at least 1 credit card with ₹50,000 limit",
        "3. Existing Yes Bank Credit Card holders are not eligible",
        "4. You will get your payout only after the card is activated by the customer.",
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
        "🎁 Welcome benefit: 2,000 Reward Points worth ₹500",
        "⛽ 4.25% valueback ~ 13x Points on fuel purchases*",
        "🌟 5x reward points on movie, groceries and dining spends",
        "⛽ 1% fuel surcharge waiver",
      ],
      whomToSale: [
        "Age: 23 years and above",
        "Applicant should be an Indian citizen",
        "Existing credit card holders of SBI are not eligible for the payout",
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
        "🛒 5% Cashback on Groceries: Save big on your daily essentials!",
        "🎬 2,000 Bonus Reward Points: Welcome gift on your first swipe within 30 days!",
        "💳 1 Reward Point per ₹100: On all other purchases.",
        "⛽ Fuel Surcharge Waiver: Up to ₹100 per month at all fuel stations.",
        "🛍️ Lifetime Free Card: No joining or annual fee!",
        "🏷️ Special Offers: Enjoy exclusive discounts and deals year-round.",
      ],
      whomToSale: [
        "- Age: 21 years or above",
        "- Resident Indian        ",
        "- Stable source of income (salaried or self-employed)",
        "- Good credit history (no defaults)",
        "- Valid PAN card and address proof",
        "- Must complete KYC as per bank norms",
        "- New to RBL customer (Customer with existing bank account or credit card of RBL are not eligible for payout)",
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
        "💳 Lifetime Free Credit Card – No joining or annual fees",
        "📲 Use Anywhere – Pay via any UPI app with your virtual card",
        "⚡ Instant Activation – Simple onboarding and verification",
        "💰 No Minimum Spend required to use your card",
        "🔁 2x Assured Cashback on every “Scan & Pay” transaction",
        "🏦 Instant Cashback Credit – Redeem anytime, directly to your bank account",
      ],
      whomToSale: [
        "1. Age: Primary Cardholder: 21-45 years",
        "2. Annual Income > ₹3 Lakh",
        "3. CIBIL Score > 720",
      ],
    },
    // tataneu
    {
      limit: "₹ 3,00,000",
      rate: "13%",
      fee: "Nil",
      validity: "Lifetime",
      income: "25,000 & above",
      age: "21 - 65 years",
      productBenefits: [
        "🚀 Extraordinary Rewards. Ready for You.",
        "🤩 Get back 1st year membership fee as NeuCoins on doing a transaction within 90 days",
        "🪙 Up to 10% cashback as NeuCoins on every TATA Neu App transaction.",
        "1 NeuCoin = ₹1",
        "✈️ Up to 8 Complimentary Domestic and 4 International Lounge Access",
        "⛽️ 1% Fuel surcharge waiver",
        "👉🏻 Renewal fee waived on annual spends of ₹1 Lakh or ₹3 Lakh (depends on variant) ",
      ],
      whomToSale: [
        "1. Age: 21 to 65 years",
        "2. Monthly Income: Salaried Employees > ₹25,000",
        "3. Self Employed: ₹6 Lakhs ITR per annum",
        "4. Have a good credit history and no payment defaults",
        "5. Have a permanent residential address in India",
      ],
    },
    // Axis Life Time Free Card
    {
      limit: "₹ 3,00,000",
      rate: "13%",
      fee: "Nil",
      validity: "Lifetime",
      income: "25,000 & above",
      age: "21 - 65 years",
      productBenefits: [
        "🎉 Axis Life Time Free Credit Card",
        "✅ ₹5,000 welcome rewards",
        "✅ Lounge access every quarter",
        "✅ Reward points on every spend",
        "✅ Fee waived on ₹2.5L annual spend",
        "Apply now & enjoy premium perks! 💳✨",
      ],
      whomToSale: [
        "1. Age : 21-60 years",
        "2. Customers with good credit Score",
        "3. Self employed customers with Zero credit score i.e. no credit history are not eligible",
        "4. Income criteria:",
        "- Salaried with Good credit score - Income above ₹15,000 Per month",
        "- Salaried with Zero credit Score - Income above ₹25,000 Per Month",
        "- Self Employed with Good credit Score - Income above ₹30,000 Per Month",
        "- Self Employed with Zero credit score i.e. no credit history - Not allowed.",
        "5. Document Required - PAN, Aadhaar, Income Proof",
        "6. Customer must be within 50km of their Aadhar or Communication address during Video KYC.",
      ],
    },
    // Axis Bank Credit Card
    {
      limit: "₹ 3,00,000",
      rate: "13%",
      fee: "Nil",
      validity: "Lifetime",
      income: "25,000 & above",
      age: "21 - 65 years",
      productBenefits: [
        "✔️ Choose from multiple credit cards to suit your lifestyle",
        "✔️ Complimentary airport lounge access (on some variants)",
        "✔️ Exciting rewards and cashback benefits",
      ],
      whomToSale: [
        "1. Age : 21-60 years",
        "2. Customers with good credit Score",
        "3. Self employed customers with Zero credit score i.e. no credit history are not eligible",
        "4. Income criteria:",
        "- Salaried with Good credit score - Income above ₹15,000 Per month",
        "- Salaried with Zero credit Score - Income above ₹25,000 Per Month",
        "- Self Employed with Good credit Score - Income above ₹30,000 Per Month",
        "- Self Employed with Zero credit score i.e. no credit history - Not allowed.",
        "5. Document Required - PAN, Aadhaar, Income Proof",
        "6. Customer must be within 50km of their Aadhar or Communication address during Video KYC.",
      ],
    },
    // LIC Axis Bank Credit Card

    {
      limit: "₹ 3,00,000",
      rate: "13%",
      fee: "Nil",
      validity: "Lifetime",
      income: "25,000 & above",
      age: "21 - 65 years",
      productBenefits: [
        "🎖 2 Reward points/ ₹100 spent on LIC payment",
        "💳 Lifetime free credit card",
        "✈️ 8 domestic lounge visits/ year (Signature)",
        "⛽️ 1% surcharge waiver on fuel spends",
      ],
      whomToSale: [
        "1. The primary Cardholder should be in the age bracket of 21 years to 70 years",
        "2. The add-on Cardholder should be 18 years and above",
        "3. Income – ₹6 Lakhs and above per annum (Signature) and ₹3 Lakhs and above per annum (Platinum)",
        "4. Applicant must be an Indian citizen.",
        "5. Please check if the customer is an existing Axis Bank customer, do not process such applications",
      ],
    },
    // SBI QDE Credit Card
    {
      limit: "₹ 3,00,000",
      rate: "13%",
      fee: "Nil",
      validity: "Lifetime",
      income: "25,000 & above",
      age: "21 - 65 years",
      productBenefits: [
        "✔️ Get SBI simply save credit card at an annual fee of just ₹499 + GST",
        "💰Welcome Benefits: Get 2000 bonus reward points worth ₹500 on spending ₹2000 in 60 days.",
        "🛒10X Reward Points on grocery shopping, dining & movies (4 Reward points = ₹1)",
        "⛽ Fuel Surcharge Reversal up to ₹100 per month (On fuel bill between ₹500 to ₹3000)",
        "✔️ Annual membership fee is reversed from next year if total spend is more than ₹1 lakh in the previous year",
        "💳 Free add on card for family members",
      ],
      whomToSale: [""],
    },
    // Jupiter Rupay Credit Card

    {
      limit: "₹ 3,00,000",
      rate: "13%",
      fee: "Nil",
      validity: "Lifetime",
      income: "25,000 & above",
      age: "21 - 65 years",
      productBenefits: [
        "🛍️ 10% cashback on Amazon, Flipkart, Myntra, AJIO & more (up to ₹1,500)",
        "✈️ 5% cashback on MMT, Yatra, Cleartrip, EMT (up to ₹1,000)",
        "💳 1% cashback on all other spends (up to ₹1,000)",
        "💎 Earn up to 50X reward points as redeemable jewels",
        "🎁 Includes a complimentary 1-year Amazon Prime subscription",
        "🔥 Maximize rewards on shopping, travel & daily spends!",
      ],
      whomToSale: [
        "1. Ideal Age Group: 28–35",
        "2. Extended Target Group: 25–40",
        "3. Location: Metro and Tier 1 cities",
        "4. CIBIL Score: 720+ required",
      ],
    },
    // CASHBACK SBI Credit_Card

    {
      limit: "₹ 3,00,000",
      rate: "13%",
      fee: "Nil",
      validity: "Lifetime",
      income: "25,000 & above",
      age: "21 - 65 years",
      productBenefits: [
        "🌐 5% Cashback on online spends",
        "🛍️ 1% Cashback on offline spends",
        "💳 Cashback auto-credit to SBI Card account",
        "🔄 Reversal of Renewal Fee on annual spends of Rs.2 La",
        "⛽ 1% fuel surcharge waiver",
      ],
      whomToSale: [
        "Age: 23 years and above",
        "Applicant should be an Indian citizen",
        "Existing credit card holders of SBI are not eligible for the payout",
      ],
    },
    // SBI Credit Card
    {
      limit: "₹ 3,00,000",
      rate: "13%",
      fee: "Nil",
      validity: "Lifetime",
      income: "25,000 & above",
      age: "21 - 65 years",
      productBenefits: [
        "💳 Easy & secure payments",
        "🏆 Reward Points on spends",
        "🍴 Dining, travel & lifestyle offers",
        "✅ Fee waived on ₹2.5L annual spend💸 Cashback & discounts",
      ],
      whomToSale: [
        "Age: 23 years and above",
        "Applicant should be an Indian citizen",
        "Existing credit card holders of SBI are not eligible for the payout",
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

  const isBest = index < 6 && type === "instant";

  

  return `
    <div class="loan-card p-4 mb-4 position-relative">
    ${isBest ? `<div class="best-badge">Best</div>` : ""}
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div class="d-flex align-items-center">
          <img src="${vendor.image}"  alt="${vendor.name}" class="vendor-logo">
          
          
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
         <hr>
          <!-- Product Benefits Section -->
         <div class= "d-flex justify-content-evenly"> ${
           data.productBenefits
             ? `
            <div class="benefits mt-4 ">
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
            <div class="target-customers mt-4 pt-3 ">
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
          }</div>
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
  renderLoanCards("instant", "instantLoansContainer");
  renderLoanCards("personal", "personalLoanContainer");
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

document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openFormBtn");
  const closeBtn = document.getElementById("closeFormBtn");
  const popup = document.getElementById("popupForm");

  openBtn.addEventListener("click", () => {
    popup.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
      document.body.classList.remove("no-scroll");
    }
  });
});

function animateCounter(element, target, suffix = "") {
  const duration = 2000; // 2 seconds
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  let step = 0;

  const timer = setInterval(() => {
    step++;
    current = Math.min(increment * step, target);

    if (target >= 1000) {
      // Format large numbers with commas
      element.textContent = Math.floor(current).toLocaleString() + suffix;
    } else {
      element.textContent = Math.floor(current) + suffix;
    }

    if (step >= steps) {
      clearInterval(timer);
      // Ensure final value is exact
      if (target >= 1000) {
        element.textContent = target.toLocaleString() + suffix;
      } else {
        element.textContent = target + suffix;
      }
    }
  }, duration / steps);
}

// Intersection Observer for triggering animations when in view
const observerOptions = {
  threshold: 0.3,
  rootMargin: "0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const statItems = entry.target.querySelectorAll(".stat-item");

      statItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("animated");

          const numberElement = item.querySelector(".stat-number");
          const target = parseInt(numberElement.dataset.target);
          const suffix = numberElement.dataset.suffix || "";

          animateCounter(numberElement, target, suffix);
        }, index * 200); // Stagger the animations
      });

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Start observing when page loads
document.addEventListener("DOMContentLoaded", () => {
  const statsContainer = document.querySelector(".stats-container");
  observer.observe(statsContainer);
});
