// ================= Smooth Scrolling =================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ================= Loan Calculator =================
function formatCurrency(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}

function formatLargeAmount(amount) {
  if (amount >= 1e7) return `₹${(amount / 1e7).toFixed(1)}Cr`;
  if (amount >= 1e5) return `₹${(amount / 1e5).toFixed(1)}L`;
  return formatCurrency(amount);
}

function calculateEMI(principal, rate, tenure) {
  const monthlyRate = rate / (12 * 100);
  if (monthlyRate === 0) return principal / tenure;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
    (Math.pow(1 + monthlyRate, tenure) - 1)
  );
}

function updateChart(principal, interest) {
  const principalArc = document.getElementById("principalArc");
  const interestArc = document.getElementById("interestArc");

  if (!principalArc || !interestArc) return;

  const total = principal + interest;
  if (total <= 0) return;

  const circumference = 2 * Math.PI * 80; // radius = 80
  const principalLength = (principal / total) * circumference;
  const interestLength = (interest / total) * circumference;

  // ✅ Update principal arc
  principalArc.style.strokeDasharray = `${principalLength} ${circumference}`;
  principalArc.style.strokeDashoffset = "0";

  // ✅ Update interest arc after principal arc
  interestArc.style.strokeDasharray = `${interestLength} ${circumference}`;
  interestArc.style.strokeDashoffset = `-${principalLength}`;
}

function updateCalculations() {
  const loanAmountSlider = document.getElementById("loanAmount");
  const tenureSlider = document.getElementById("tenure");
  const interestRateSlider = document.getElementById("interestRate");

  if (!loanAmountSlider || !tenureSlider || !interestRateSlider) return;

  // ✅ Convert slider values into numbers
  const principal = parseFloat(loanAmountSlider.value) || 0;
  const tenure = parseInt(tenureSlider.value) || 0;
  const rate = parseFloat(interestRateSlider.value) || 0;

  // Displays
  const loanAmountDisplay = document.getElementById("loanAmountDisplay");
  const tenureDisplay = document.getElementById("tenureDisplay");
  const interestRateDisplay = document.getElementById("interestRateDisplay");
  const monthlyEMI = document.getElementById("monthlyEMI");
  const totalInterest = document.getElementById("totalInterest");
  const totalPayable = document.getElementById("totalPayable");

  if (loanAmountDisplay)
    loanAmountDisplay.textContent = formatLargeAmount(principal);
  if (tenureDisplay)
    tenureDisplay.textContent =
      tenure > 12
        ? `${Math.floor(tenure / 12)} Years ${tenure % 12} Months`
        : `${tenure} Months`;
  if (interestRateDisplay) interestRateDisplay.textContent = `${rate}%`;

  // ✅ EMI calculation
  const emi = calculateEMI(principal, rate, tenure);
  const totalAmount = emi * tenure;
  const totalInterestAmount = totalAmount - principal;

  // ✅ Update text values
  if (monthlyEMI) monthlyEMI.textContent = formatCurrency(Math.round(emi));
  if (totalInterest)
    totalInterest.textContent = formatLargeAmount(
      Math.round(totalInterestAmount)
    );
  if (totalPayable)
    totalPayable.textContent = formatLargeAmount(Math.round(totalAmount));

  // ✅ Update chart with principal vs interest
  updateChart(principal, totalInterestAmount);
  // ✅ Update chart
  updateChart(principal, totalInterestAmount);
}

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
    name: "Ramesh Iyer",
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
    {
      name: "MoneyView",
      link: "https://moneyview.in/personal-loan?utm_source=bl&utm_medium=digiloans&utm_campaign=dsa",
      image: "./images/moneyview.svg",
    },
    {
      name: "InCred",
      link: "https://www.incred.com/personal-loan/?partnerId=8313827854371024P&utm_source=DSA&utm_medium=digiloans&utm_campaign=Buddyloan",
      image: "./images/increed.svg",
    },
    {
      name: "Smartcoin (Olyv)",
      link: "https://tinyurl.com/SMARCOIN2527",
      image: "./images/Smart_Coin_847bcd1cc3.avif",
    },
    {
      name: "Zype",
      link: "https://zype.onelink.me/vx8a?af_xp=custom&pid=CustomerSource&af_dp=com.zype.mobile%3A%2F%2F&deep_link_value=myZype&af_click_lookback=30d&c=BuddyloanDSA_37",
      image: "./images/Zype_1_bf0dfd1242.avif",
    },
    {
      name: "IDFC First Bank",
      link: "https://loan.indiasales.club?productCode=IDFC_PL&journeyId=1&shortCode=1i2PwQUfAwmwtH3etD4R6&subCode=l&productTypeId=478&productType=Personal%20Loan&memberId=4HC66777&transitionId=2e39ea5d-e3db-4159-91c3-0631353ebeb3",
      image: "./images/IDFC_First_Bank_d21b7112b9.avif",
    },
    {
      name: "Fi Money",
      link: "https://loan.indiasales.club?productCode=FI_LOAN&journeyId=1&shortCode=1i2PwQUfAwmwtH3etD4R6&subCode=l&productTypeId=368&productType=Personal%20Loan&memberId=4HC66777&transitionId=2e39ea5d-e3db-4159-91c3-0631353ebeb3",
      image: "./images/FI_Money_Logo_f8579baa44.avif",
    },
    {
      name: "IndusInd Bank",
      link: "https://loan.indiasales.club?productCode=INDUS_LOAN&journeyId=1&shortCode=1i2PwQUfAwmwtH3etD4R6&subCode=l&productTypeId=271&productType=Personal%20Loan&memberId=4HC66777&transitionId=2e39ea5d-e3db-4159-91c3-0631353ebeb3",
      image: "./images/1694242872_IndusInd_re.svg",
    },
    {
      name: "mPokket",
      link: "https://loan.indiasales.club?productCode=MPOKKET&journeyId=1&shortCode=1i2PwQUfAwmwtH3etD4R6&subCode=l&productTypeId=258&productType=Personal%20Loan&memberId=4HC66777&transitionId=2e39ea5d-e3db-4159-91c3-0631353ebeb3",
      image: "./images/1694242888_mpockket_re.svg",
    },
    {
      name: "Hero Fincorp",
      link: "https://hipl.onelink.me/1OrE/qdf4ck6o",
      image: "./images/herofinc.webp",
    },
    {
      name: "Ram Fincorp",
      link: "https://loan.indiasales.club?productCode=RAM_PL&journeyId=1&shortCode=1i2PwQUfAwmwtH3etD4R6&subCode=l&productTypeId=497&productType=Personal%20Loan&memberId=4HC66777&transitionId=2e39ea5d-e3db-4159-91c3-0631353ebeb3",
      image: "./images/Ram_Fincorp_Logo_31f77c77e2.avif",
    },
    {
      name: "Bharat Loan",
      link: "https://loan.indiasales.club?productCode=BPL&journeyId=1&shortCode=1i2PwQUfAwmwtH3etD4R6&subCode=l&productTypeId=500&productType=Personal%20Loan&memberId=4HC66777&transitionId=2e39ea5d-e3db-4159-91c3-0631353ebeb3",
      image: "./images/bharat.webp",
    },
    {
      name: "Rupee 112",
      link: "https://loan.indiasales.club?productCode=RUP_PL&journeyId=1&shortCode=1i2PwQUfAwmwtH3etD4R6&subCode=l&productTypeId=498&productType=Personal%20Loan&memberId=4HC66777&transitionId=2e39ea5d-e3db-4159-91c3-0631353ebeb3",
      image: "./images/rupee112.webp",
    },
    {
      name: "FIBE (Early Salary)",
      link: "https://webportal.fibe.in/easy-loan?utm_source=BUDDYLOANPA&utm_medium=digiloans&campaignid=DSA",
      image: "./images/fibe.webp",
    },
    {
      name: "LNT",
      link: "COMING SOON",
      image: "./images/lnt_finance_b74f4dee69.avif",
    },
    {
      name: "PAYRUPIK",
      link: "https://app.adjust.com/1sflo7sv?campaign={digiloans}&adgroup={buddy_loan01}&creative={BDL_dsa}&idfa={af_9}&click_id={click_id}&gps_adid={af_9}&android_id={af_6}&ip_address={af_5}&impression_id={af_7}&install_callback=https%3A%2F%2Futils.follow.whistle.mobi%2Fpixel.php%3Flinkid%3D{click_id}",
      image: "./images/payrupik.webp",
    },
    {
      name: "Aditya Birla Finance",
      link: "https://abfl.finbox.in/?partnerCode=BS_LIICJW&agentCode=digiloans&productType=personal_loan",
      image: "./images/Adity_Birla_Capital_Finance_dbcf07676a.avif",
    },
    {
      name: "Bajaj Market",
      link: "https://www.bajajfinservmarkets.in/apply-for-personal-loan-finservmarkets/?utm_source=B2B&utm_medium=E-referral&utm_campaign=Gaurav&utm_content=star_powerz_digital_technologies_private_limited",
      image: "./images/Daco_4954654.png",
    },
    {
      name: "Kissht",
      link: "https://kissht.onelink.me/I5a1?af_xp=custom&pid=Buddyloan01&c=Buddyloan01&is_retargeting=true&af_reengagement_window=3d&af_sub1=digiloans&af_click_lookback=30d",
      image: "./images/kissht.webp",
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
    {
      name: "ABFL Business Loan",
      link: "COMING SOON",
      image: "./images/Adity_Birla_Capital_Finance_dbcf07676a.avif",
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
    {
      name: "SBI Credit Card",
      link: "https://www.sbicard.com/sprint/c/simplyClick?ch=dis&GEMID1=dis_smart_SimplyClick_conversion_April25_eapply_Banner_static_digiloans&GEMID2=Buddyloan",
      image: "./images/sbi.png",
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
      image: "./images/sbi.webp",
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
  ],
};

// Sample data for different loan types
const sampleData = {
  personal: [
    {
      amount: "₹ 5,00,000",
      rate: "18%",
      fee: "2% to 4% + GST",
      tenure: "3 Years",
      income: "20,000 & above",
      age: "22 - 58 years",
      policies: `Payout T&C
1. The payout will be applicable only if the customer successfully disburses the loan through the partner's platform.
2. In case the customer gets rejected and is redirected to the Personal Loan journey, the payout will not be applicable for that lead.

Other T&C
1. Customer must have an HDFC Bank Credit Card.
2. No past delay in Credit Card payments.
3. No ongoing loan or EMI on the Credit Card.
4. Loan amount should be more than or equal to ₹25,000.
5. PAN and Aadhaar should be available.
6. Date of Birth on PAN and Aadhaar should match.
7. User must apply from their own device and mobile number.
8. No loan/credit defaults or write-offs should be there.
9. No delays in other loan/credit payments.
10. Address should be complete, with no short forms, and include proper landmarks.
11. The name on all documents should be the same.
12. Payout will be received only after successful credit line disbursement.
13. Loan application process should be completed in a single journey.
14. The partner should not accept any payment or give any incentive to the customer for availing the loan through this platform.
15. The partner is expected not to make false promises or provide wrong and misleading information to the customer.`,
    },
    {
      amount: "₹ 10,00,000",
      rate: "15%",
      fee: "1% to 3% + GST",
      tenure: "5 Years",
      income: "25,000 & above",
      age: "21 - 60 years",
      policies: `Payout T&C
1. The payout will be applicable only if the customer successfully disburses the loan through the partner's platform.
2. In case the customer gets rejected and is redirected to the Personal Loan journey, the payout will not be applicable for that lead.

Other T&C
1. Customer must have an HDFC Bank Credit Card.
2. No past delay in Credit Card payments.
3. No ongoing loan or EMI on the Credit Card.
4. Loan amount should be more than or equal to ₹25,000.
5. PAN and Aadhaar should be available.
6. Date of Birth on PAN and Aadhaar should match.
7. User must apply from their own device and mobile number.
8. No loan/credit defaults or write-offs should be there;
9. No delays in other loan/credit payments.
10. Address should be complete, with no short forms, and include proper landmarks.
11. The name on all documents should be the same.
12. Payout will be received only after successful credit line disbursement.
13. Loan application process should be completed in a single journey.
14. The partner should not accept any payment or give any incentive to the customer for availing the loan through this platform.
15. The partner is expected not to make false promises or provide wrong and misleading information to the customer.`,
    },
    {
      amount: "₹ 2,00,000",
      rate: "24%",
      fee: "2% to 5% + GST",
      tenure: "2 Years",
      income: "15,000 & above",
      age: "23 - 55 years",
      policies: `Payout T&C
1. The payout will be applicable only if the customer successfully disburses the loan through the partner's platform.
2. In case the customer gets rejected and is redirected to the Personal Loan journey, the payout will not be applicable for that lead.

Other T&C
1. Customer must have an HDFC Bank Credit Card.
2. No past delay in Credit Card payments.
3. No ongoing loan or EMI on the Credit Card.
4. Loan amount should be more than or equal to ₹25,000.
5. PAN and Aadhaar should be available.
6. Date of Birth on PAN and Aadhaar should match.
7. User must apply from their own device and mobile number.
8. No loan/credit defaults or write-offs should be there.
9. No delays in other loan/credit payments.
10. Address should be complete, with no short forms, and include proper landmarks.
11. The name on all documents should be the same.
12. Payout will be received only after successful credit line disbursement.
13. Loan application process should be completed in a single journey.
14. The partner should not accept any payment or give any incentive to the customer for availing the loan through this platform.
15. The partner is expected not to make false promises or provide wrong and misleading information to the customer.`,
    },
    {
      amount: "₹ 7,50,000",
      rate: "16%",
      fee: "1.5% to 3.5% + GST",
      tenure: "4 Years",
      income: "30,000 & above",
      age: "25 - 65 years",
      policies: `Payout T&C
1. The payout will be applicable only if the customer successfully disburses the loan through the partner's platform.
2. In case the customer gets rejected and is redirected to the Personal Loan journey, the payout will not be applicable for that lead.

Other T&C
1. Customer must have an HDFC Bank Credit Card.
2. No past delay in Credit Card payments.
3. No ongoing loan or EMI on the Credit Card.
4. Loan amount should be more than or equal to ₹25,000.
5. PAN and Aadhaar should be available.
6. Date of Birth on PAN and Aadhaar should match.
7. User must apply from their own device and mobile number.
8. No loan/credit defaults or write-offs should be there.
9. No delays in other loan/credit payments.
10. Address should be complete, with no short forms, and include proper landmarks.
11. The name on all documents should be the same;
12. Payout will be received only after successful credit line disbursement.
13. Loan application process should be completed in a single journey.
14. The partner should not accept any payment or give any incentive to the customer for availing the loan through this platform.
15. The partner is expected not to make false promises or provide wrong and misleading information to the customer.`,
    },
    {
      amount: "₹ 3,00,000",
      rate: "22%",
      fee: "3% to 6% + GST",
      tenure: "3 Years",
      income: "18,000 & above",
      age: "21 - 60 years",
      policies: `Payout T&C
1. The payout will be applicable only if the customer successfully disburses the loan through the partner's platform.
2. In case the customer gets rejected and is redirected to the Personal Loan journey, the payout will not be applicable for that lead.

Other T&C
1. Customer must have an HDFC Bank Credit Card.
2. No past delay in Credit Card payments.
3. No ongoing loan or EMI on the Credit Card.
4. Loan amount should be more than or equal to ₹25,000;
5. PAN and Aadhaar should be available.
6. Date of Birth on PAN and Aadhaar should match.
7. User must apply from their own device and mobile number.
8. No loan/credit defaults or write-offs should be there.
9. No delays in other loan/credit payments.
10. Address should be complete, with no short forms, and include proper landmarks.
11. The name on all documents should be the same.
12. Payout will be received only after successful credit line disbursement.
13. Loan application process should be completed in a single journey.
14. The partner should not accept any payment or give any incentive to the customer for availing the loan through this platform.
15. The partner is expected not to make false promises or provide wrong and misleading information to the customer.`,
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
      policies: `Payout T&C
1. The payout will be applicable only if the customer successfully disburses the loan through the partner's platform.
2. In case the customer gets rejected and is redirected to the Personal Loan journey, the payout will not be applicable for that lead.

Other T&C
1. Customer must have an HDFC Bank Credit Card.
2. No past delay in Credit Card payments.
3. No ongoing loan or EMI on the Credit Card.
4. Loan amount should be more than or equal to ₹25,000.
5. PAN and Aadhaar should be available.
6. Date of Birth on PAN and Aadhaar should match.
7. User must apply from their own device and mobile number.
8. No loan/credit defaults or write-offs should be there.
9. No delays in other loan/credit payments.
10. Address should be complete, with no short forms, and include proper landmarks.
11. The name on all documents should be the same.
12. Payout will be received only after successful credit line disbursement.
13. Loan application process should be completed in a single journey.
14. The partner should not accept any payment or give any incentive to the customer for availing the loan through this platform.
15. The partner is expected not to make false promises or provide wrong and misleading information to the customer.`,
    },
    {
      amount: "₹ 25,00,000",
      rate: "14%",
      fee: "1.5% to 3% + GST",
      tenure: "3 Years",
      turnover: "5 Lakhs & above",
      age: "1+ years",
      policies: `Payout T&C
1. The payout will be applicable only if the customer successfully disburses the loan through the partner's platform.
2. In case the customer gets rejected and is redirected to the Personal Loan journey, the payout will not be applicable for that lead.

Other T&C
1. Customer must have an HDFC Bank Credit Card.
2. No past delay in Credit Card payments.
3. No ongoing loan or EMI on the Credit Card.
4. Loan amount should be more than or equal to ₹25,000;
5. PAN and Aadhaar should be available.
6. Date of Birth on PAN and Aadhaar should match.
7. User must apply from their own device and mobile number.
8. No loan/credit defaults or write-offs should be there.
9. No delays in other loan/credit payments.
10. Address should be complete, with no short forms, and include proper landmarks.
11. The name on all documents should be the same.
12. Payout will be received only after successful credit line disbursement.
13. Loan application process should be completed in a single journey.
14. The partner should not accept any payment or give any incentive to the customer for availing the loan through this platform.
15. The partner is expected not to make false promises or provide wrong and misleading information to the customer.`,
    },
    {
      amount: "₹ 1,00,00,000",
      rate: "11%",
      fee: "0.5% to 1.5% + GST",
      tenure: "7 Years",
      turnover: "50 Lakhs & above",
      age: "3+ years",
      policies: `Payout T&C
1. The payout will be applicable only if the customer successfully disburses the loan through the partner's platform.
2. In case the customer gets rejected and is redirected to the Personal Loan journey, the payout will not be applicable for that lead.

Other T&C
1. Customer must have an HDFC Bank Credit Card.
2. No past delay in Credit Card payments.
3. No ongoing loan or EMI on the Credit Card.
4. Loan amount should be more than or equal to ₹25,000.
5. PAN and Aadhaar should be available.
6. Date of Birth on PAN and Aadhaar should match.
7. User must apply from their own device and mobile number.
8. No loan/credit defaults or write-offs should be there.
9. No delays in other loan/credit payments.
10. Address should be complete, with no short forms, and include proper landmarks.
11. The name on all documents should be the same.
12. Payout will be received only after successful credit line disbursement.
13. Loan application process should be completed in a single journey.
14. The partner should not accept any payment or give any incentive to the customer for availing the loan through this platform.
15. The partner is expected not to make false promises or provide wrong and misleading information to the customer.`,
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
      policies: `Payout T&C
1. The payout will be applicable only if the customer successfully disburses the loan through the partner's platform.
2. In case the customer gets rejected and is redirected to the Personal Loan journey, the payout will not be applicable for that lead.

Other T&C
1. Customer must have an HDFC Bank Credit Card.
2. No past delay in Credit Card payments.
3. No ongoing loan or EMI on the Credit Card.
4. Loan amount should be more than or equal to ₹25,000.
5. PAN and Aadhaar should be available.
6. Date of Birth on PAN and Aadhaar should match.
7. User must apply from their own device and mobile number.
8. No loan/credit defaults or write-offs should be there.
9. No delays in other loan/credit payments.
10. Address should be complete, with no short forms, and include proper landmarks.
11. The name on all documents should be the same.
12. Payout will be received only after successful credit line disbursement.
13. Loan application process should be completed in a single journey.
14. The partner should not accept any payment or give any incentive to the customer for availing the loan through this platform.
15. The partner is expected not to make false promises or provide wrong and misleading information to the customer.`,
    },
    {
      limit: "₹ 5,00,000",
      rate: "11%",
      fee: "₹ 999",
      validity: "Lifetime",
      income: "30,000 & above",
      age: "21 - 60 years",
      policies: `Payout T&C
1. The payout will be applicable only if the customer successfully disburses the loan through the partner's platform.
2. In case the customer gets rejected and is redirected to the Personal Loan journey, the payout will not be applicable for that lead.

Other T&C
1. Customer must have an HDFC Bank Credit Card.
2. No past delay in Credit Card payments.
3. No ongoing loan or EMI on the Credit Card.
4. Loan amount should be more than or equal to ₹25,000.
5. PAN and Aadhaar should be available.
6. Date of Birth on PAN and Aadhaar should match.
7. User must apply from their own device and mobile number.
8. No loan/credit defaults or write-offs should be there.
9. No delays in other loan/credit payments.
10. Address should be complete, with no short forms, and include proper landmarks.
11. The name on all documents should be the same.
12. Payout will be received only after successful credit line disbursement.
13. Loan application process should be completed in a single journey.
14. The partner should not accept any payment or give any incentive to the customer for availing the loan through this platform.
15. The partner is expected not to make false promises or provide wrong and misleading information to the customer.`,
    },
    {
      limit: "₹ 2,00,000",
      rate: "15%",
      fee: "₹ 500",
      validity: "Lifetime",
      income: "20,000 & above",
      age: "21 - 70 years",
      policies: `Payout T&C
1. The payout will be applicable only if the customer successfully disburses the loan through the partner's platform.
2. In case the customer gets rejected and is redirected to the Personal Loan journey, the payout will not be applicable for that lead.

Other T&C
1. Customer must have an HDFC Bank Credit Card.
2. No past delay in Credit Card payments.
3. No ongoing loan or EMI on the Credit Card.
4. Loan amount should be more than or equal to ₹25,000.
5. PAN and Aadhaar should be available.
6. Date of Birth on PAN and Aadhaar should match.
7. User must apply from their own device and mobile number.
8. No loan/credit defaults or write-offs should be there.
9. No delays in other loan/credit payments.
10. Address should be complete, with no short forms, and include proper landmarks.
11. The name on all documents should be the same.
12. Payout will be received only after successful credit line disbursement.
13. Loan application process should be completed in a single journey.
14. The partner should not accept any payment or give any incentive to the customer for availing the loan through this platform.
15. The partner is expected not to make false promises or provide wrong and misleading information to the customer.`,
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
      policies: `
      1. Customers should have a valid Aadhaar number and PAN card.

      2. Customers should use the same number that is linked to their Aadhaar while processing the application.

     3. The customer’s address should be from eligible PIN Codes.

    4. You will get your payout only after the card is activated by the customer.`,
    },
    {
      limit: "₹ 3,00,000",
      rate: "13%",
      fee: "Nil",
      validity: "Lifetime",
      income: "25,000 & above",
      age: "21 - 65 years",
      policies: `
   DOs:

1. Encourage application via digital channels only.

2. Inform customers about reward structure and redemption platform.

3. Highlight spend threshold for lounge access clearly.

4. Advise customers to use the app for payments and redemptions.



DON’Ts:

1. Don’t oversell benefits beyond actual thresholds (e.g., lounge access, travel spend).

2. Don’t suggest rewards can be redeemed outside the Scapia app.

3. Don’t use trademarks or branding without approval.



Additional Terms:

1. Customers must have valid Aadhaar and PAN.

2. The mobile number used must be the same one linked to Aadhaar.

3. Customer’s address must be within eligible PIN codes.

4. Full Payouts to you will be made only after the card is activated by the customer.`,
    },
    {
      limit: "₹ 3,00,000",
      rate: "13%",
      fee: "Nil",
      validity: "Lifetime",
      income: "25,000 & above",
      age: "21 - 65 years",
      policies: `
  Target Customers

Credit score above 750 and no negative credit remarks

Annual income: ₹3 Lakhs and above

Age: 21–60 years

Valid PAN & Aadhaar card

Card available only for selected pincodes



Other T&Cs

- Customers must have Aadhaar and PAN card

- Aadhaar should be linked to the customer’s mobile number

- Payout will be made only after card approval and dispatch

- Proof of residence required if Aadhaar address is outdated

- Minimum age: 21 years; Maximum age: 60 years or retirement age

- Minimum monthly income: ₹25,000

- Card must be activated via first transaction within 30 days or penalty applies`,
    },
    {
      limit: "₹ 3,00,000",
      rate: "13%",
      fee: "Nil",
      validity: "Lifetime",
      income: "25,000 & above",
      age: "21 - 65 years",
      policies: `
  1. Both salaried individuals and self employed individuals are eligible for the AU Small Finance bank Credit Card.

2. Customers who are working as Daily wagers / Labours & Contractors / Lower profile blue collared job are not eligible for this card.

3. Customer’s net yearly income should be above Rs. 3,00,000.

4. Customer’s current residence and office address should be from mentioned list of pincodes.

5. Customer should have a valid PAN and Aadhaar Card.

6. Customers should have a good credit score.

7. Customers with good track record in CIBIL are preferred

8. Based on the customer’s eligibility and selected card type, may be required to upload additional documents, like - Last three month’s Bank account statement, Income tax return statement and latest credit card statement.

9. Existing customers of AU Small Finance Bank are not eligible.

10. Your customer should complete the whole application process in one attempt without clicking back button. They need to complete video KYC within 72 hours of application.

11. Your customer should activate the credit card by making their 1st transaction within 30 days. If the card is not activated or canceled by the customer, a penalty will be charged.`,
    },
  ],
};

function getRandomData(type, index) {
  const dataArray = sampleData[type];
  return dataArray[index % dataArray.length];
}

function createLoanCard(vendor, index, type) {
  const data = getRandomData(type, index);
  const isComingSoon = vendor.link === "COMING SOON" || !vendor.link;
  const cardId = `${type}-${index}`;

  return `
                <div class="loan-card p-4">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                    <div class="d-flex align-items-center">
                          <img src="${vendor.image}" alt="${
    vendor.name
  }" class="vendor-logo me-3" style="width:150px;height:50px; object-fit:cover;object-fit:contain;border-radius:8px;">
</div>
                        
                        <button class="btn apply-btn ${
                          isComingSoon ? "disabled" : ""
                        }" 
  onclick="${
    isComingSoon
      ? ""
      : `openLoanModal('${vendor.name.replace(/'/g, "\\'")}', '${getRandomData(
          type,
          index
        ).rate.replace(/'/g, "\\'")}')`
  }"
  ${isComingSoon ? "disabled" : ""}>
  ${isComingSoon ? "A pply Now" : "Apply Now"}
</button>
                    </div>

                    <div class="row loan-details mb-4">
                        <div class="col-6 col-md-3 mb-3">
                            <div class="detail-label">${
                              type === "business"
                                ? "Loan Amount:"
                                : type === "emi"
                                ? "Credit Limit:"
                                : "Loan Amount:"
                            }</div>
                            <div class="detail-value">upto ${
                              type === "emi" ? data.limit : data.amount
                            }</div>
                        </div>
                        <div class="col-6 col-md-3 mb-3">
                            <div class="detail-label">Interest Rate:</div>
                            <div class="detail-value">Starting from ${
                              data.rate
                            }</div>
                        </div>
                        <div class="col-6 col-md-3 mb-3">
                            <div class="detail-label">Processing Fee:</div>
                            <div class="detail-value">${data.fee}</div>
                        </div>
                        <div class="col-6 col-md-3 mb-3">
                            <div class="detail-label">${
                              type === "emi" ? "Validity:" : "Tenure:"
                            }</div>
                            <div class="detail-value">${
                              type === "emi" ? data.validity : data.tenure
                            }</div>
                        </div>
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                        <p class="eligibility-text mb-0">
                            View your loan eligibility quickly—just a few simple fields required!
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
                                        <span class="text-muted">${
                                          data.fee
                                        }</span>
                                    </div>
                                    <div class="d-flex justify-content-between mb-2">
                                        <span class="fw-medium">Prepayment Charges:</span>
                                        <span class="text-success">Nil</span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="d-flex justify-content-between mb-2">
                                        <span class="fw-medium">${
                                          type === "business"
                                            ? "Business Age:"
                                            : "Age:"
                                        }</span>
                                        <span class="text-muted">${
                                          type === "business"
                                            ? data.age
                                            : data.age
                                        }</span>
                                    </div>
                                    <div class="d-flex justify-content-between mb-2">
                                        <span class="fw-medium">${
                                          type === "business"
                                            ? "Min Turnover:"
                                            : "Min Income:"
                                        }</span>
                                        <span class="text-muted">${
                                          type === "business"
                                            ? data.turnover
                                            : data.income
                                        }</span>
                                    </div>
                                </div>
                            </div>
                            ${
                              data.policies
                                ? `<div class="policies mt-3 pt-2 border-top">
                                      <h6 class="fw-bold mb-2">Policies:</h6>
                                      <pre style="white-space:pre-wrap;font-size:0.97rem;margin:0;">${data.policies}</pre>
                                   </div>`
                                : ""
                            }
                        </div>
                    </div>
                </div>
            `;
}

function renderLoanCards(type, containerId) {
  const container = document.getElementById(containerId);
  const vendors = loanData[type];
  container.innerHTML = vendors
    .map((vendor, index) => createLoanCard(vendor, index, type))
    .join("");
}

// Initialize all loan cards
document.addEventListener("DOMContentLoaded", function () {
  renderLoanCards("personal", "personalLoansContainer");
  renderLoanCards("business", "businessLoansContainer");
  renderLoanCards("emi", "emiCardsContainer");
  renderLoanCards("credit", "creditCardsContainer");

  // Add event listeners for collapse toggles
  document.addEventListener("shown.bs.collapse", function (e) {
    const toggle = document.querySelector(`[href="#${e.target.id}"]`);
    toggle.innerHTML = 'Detailed Offers <i class="fas fa-chevron-up"></i>';
  });

  document.addEventListener("hidden.bs.collapse", function (e) {
    const toggle = document.querySelector(`[href="#${e.target.id}"]`);
    toggle.innerHTML = 'Detailed Offers <i class="fas fa-chevron-down"></i>';
  });
});

let currentIndex = 0;
const cardsPerPage = 7;

function renderPersonalLoanCards() {
  const container = document.getElementById("personalLoansContainer");
  container.innerHTML = "";
  const vendors = loanData.personal;
  const end = Math.min(currentIndex + cardsPerPage, vendors.length);
  for (let i = 0; i < end; i++) {
    container.innerHTML += createLoanCard(vendors[i], i, "personal");
  }
  // Show/hide View More button
  const viewMoreBtn = document.getElementById("viewMoreBtn");
  if (end < vendors.length) {
    viewMoreBtn.style.display = "block";
  } else {
    viewMoreBtn.style.display = "none";
  }
}

document.getElementById("viewMoreBtn").addEventListener("click", function () {
  currentIndex += cardsPerPage;
  renderPersonalLoanCards();
});

// Initial render
document.addEventListener("DOMContentLoaded", function () {
  currentIndex = 0;
  renderPersonalLoanCards();
});

// ================= Loan Modal =================
function openLoanModal(vendorName, interestRate) {
  document.getElementById("loanModal").style.display = "block";
  document.getElementById("modalVendorName").textContent = vendorName;
  document.getElementById("modalInterestRate").textContent = interestRate;
}

function closeLoanModal() {
  document.getElementById("loanModal").style.display = "none";
}

// Close modal when clicking outside content
window.addEventListener("click", function (e) {
  const modal = document.getElementById("loanModal");
  if (e.target === modal) {
    closeLoanModal();
  }
});

// Handle form submission
document.addEventListener("DOMContentLoaded", function () {
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

// Add click event to Know More button
document.querySelector(".know-more-btn").addEventListener("click", () => {
  alert(
    "Know More button clicked! You can add your custom functionality here."
  );
});

// Add hover effects for additional interactivity
document.querySelectorAll(".stat-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    const number = item.querySelector(".stat-number");
    number.style.transform = "scale(1.05)";
    number.style.transition = "transform 0.3s ease";
  });

  item.addEventListener("mouseleave", () => {
    const number = item.querySelector(".stat-number");
    number.style.transform = "scale(1)";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const calcApplyBtn = document.getElementById("calculatorApplyBtn");
  if (calcApplyBtn) {
    calcApplyBtn.addEventListener("click", function () {
      openContactModal();
    });
  }
});
function createLoanCard(vendor, index, type) {
  const data = getRandomData(type, index);
  const isComingSoon = vendor.link === "COMING SOON" || !vendor.link;
  const cardId = `${type}-${index}`;

  return `
    <div class="loan-card p-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div class="d-flex align-items-center">
          <img src="${vendor.image}" alt="${
    vendor.name
  }" class="vendor-logo me-3" style="width:150px;height:50px; object-fit:cover;object-fit:contain;border-radius:8px;">
        </div>
        
        <button class="btn apply-btn ${isComingSoon ? "disabled" : ""}" 
          onclick="${
            isComingSoon
              ? ""
              : `openLoanModal('${vendor.name.replace(/'/g, "\\'")}', '${
                  getRandomData(type, index).rate
                    ? getRandomData(type, index).rate.replace(/'/g, "\\'")
                    : "Variable Rate"
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
              ? data.limit || data.amount
              : data.amount
          }</div>
        </div>
        <div class="col-6 col-md-3 mb-3">
          <div class="detail-label">Interest Rate:</div>
          <div class="detail-value">Starting from ${data.rate}</div>
        </div>
        <div class="col-6 col-md-3 mb-3">
          <div class="detail-label">Processing Fee:</div>
          <div class="detail-value">${data.fee}</div>
        </div>
        <div class="col-6 col-md-3 mb-3">
          <div class="detail-label">${
            type === "emi" || type === "credit" ? "Validity:" : "Tenure:"
          }</div>
          <div class="detail-value">${
            type === "emi" || type === "credit"
              ? data.validity || data.tenure
              : data.tenure
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
                <span class="text-muted">${data.fee}</span>
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
                  type === "business" ? data.age : data.age
                }</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span class="fw-medium">${
                  type === "business" ? "Min Turnover:" : "Min Income:"
                }</span>
                <span class="text-muted">${
                  type === "business" ? data.turnover : data.income
                }</span>
              </div>
            </div>
          </div>
          ${
            data.policies
              ? `<div class="policies mt-3 pt-2 border-top">
                  <h6 class="fw-bold mb-2">Policies:</h6>
                  <pre style="white-space:pre-wrap;font-size:0.97rem;margin:0;">${data.policies}</pre>
                </div>`
              : ""
          }
        </div>
      </div>
    </div>
  `;
}

// Update your DOMContentLoaded event to render all sections consistently
document.addEventListener("DOMContentLoaded", function () {
  // Remove the separate renderCreditCards() call
  // Use the unified renderLoanCards for all sections
  renderLoanCards("personal", "personalLoansContainer");
  renderLoanCards("business", "businessLoansContainer");
  renderLoanCards("emi", "emiCardsContainer");
  renderLoanCards("credit", "creditCardsContainer"); // Now uses the same modal system

  // Add event listeners for collapse toggles
  document.addEventListener("shown.bs.collapse", function (e) {
    const toggle = document.querySelector(`[href="#${e.target.id}"]`);
    if (toggle) {
      toggle.innerHTML = 'Detailed Offers <i class="fas fa-chevron-up"></i>';
    }
  });

  document.addEventListener("hidden.bs.collapse", function (e) {
    const toggle = document.querySelector(`[href="#${e.target.id}"]`);
    if (toggle) {
      toggle.innerHTML = 'Detailed Offers <i class="fas fa-chevron-down"></i>';
    }
  });
});

// Make sure your loanData.credit entries have proper structure
// Add this to ensure credit cards work with the modal
const updatedCreditData = loanData.credit.map((card) => ({
  ...card,
  link: card.link || "available", // Set to "available" instead of undefined so isComingSoon will be false
}));

// Update the loanData.credit
loanData.credit = updatedCreditData;


// Replace the renderCreditCards function with this corrected version
function renderCreditCards() {
  const container = document.getElementById("creditCardsContainer");
  if (!container) return;

  container.innerHTML = loanData.credit
    .map((vendor, idx) => {
      const card = sampleData.credit[idx] || {};
      // Since credit cards don't have links, we'll make them available for application
      const isComingSoon = false; // Changed this to false to show Apply Now buttons

      return `
        <div class="loan-card p-4 mb-4">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="d-flex align-items-center">
              <img src="${vendor.image}" alt="${vendor.name}" class="vendor-logo me-3" style="width:150px;height:50px; object-fit:contain;border-radius:8px;">
            </div>
            
            <button class="btn apply-btn ${isComingSoon ? 'disabled' : ''}" 
              onclick="${isComingSoon ? '' : `openLoanModal('${vendor.name.replace(/'/g, "\\'")}', '${card.rate || 'Variable'}')`}"
              ${isComingSoon ? 'disabled' : ''}>
              ${isComingSoon ? 'Coming Soon' : 'Apply Now'}
            </button>
          </div>

          <h5 class="mb-3 fw-bold">${vendor.name}</h5>

          <div class="row loan-details mb-4">
            <div class="col-6 col-md-3 mb-3">
              <div class="detail-label">Credit Limit:</div>
              <div class="detail-value">upto ${card.limit || '₹3,00,000'}</div>
            </div>
            <div class="col-6 col-md-3 mb-3">
              <div class="detail-label">Interest Rate:</div>
              <div class="detail-value">Starting from ${card.rate || '13%'}</div>
            </div>
            <div class="col-6 col-md-3 mb-3">
              <div class="detail-label">Fee:</div>
              <div class="detail-value">${card.fee || 'Nil'}</div>
            </div>
            <div class="col-6 col-md-3 mb-3">
              <div class="detail-label">Validity:</div>
              <div class="detail-value">${card.validity || 'Lifetime'}</div>
            </div>
          </div>

          <div class="d-flex justify-content-between align-items-center">
            <p class="eligibility-text mb-0">
              View your card eligibility quickly—just a few simple fields required!
            </p>
            <a class="details-toggle" data-bs-toggle="collapse" href="#collapse-credit-${idx}" role="button">
              Detailed Offers <i class="fas fa-chevron-down"></i>
            </a>
          </div>

          <div class="collapse" id="collapse-credit-${idx}">
            <div class="collapse-content p-3">
              <div class="row">
                <div class="col-md-6">
                  <div class="d-flex justify-content-between mb-2">
                    <span class="fw-medium">Processing Fee:</span>
                    <span class="text-muted">${card.fee || 'Nil'}</span>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <span class="fw-medium">Annual Charges:</span>
                    <span class="text-success">Nil</span>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="d-flex justify-content-between mb-2">
                    <span class="fw-medium">Age:</span>
                    <span class="text-muted">${card.age || '21 - 65 years'}</span>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <span class="fw-medium">Min Income:</span>
                    <span class="text-muted">${card.income || '25,000 & above'}</span>
                  </div>
                </div>
              </div>
              ${card.policies ? `<div class="policies mt-3 pt-2 border-top">
                <h6 class="fw-bold mb-2">Policies:</h6>
                <pre style="white-space:pre-wrap;font-size:0.97rem;margin:0;">${card.policies}</pre>
              </div>` : ''}
            </div>
          </div>
        </div>
      `;
    })
    .join('');
}

// Alternative approach: Use the same createLoanCard function for consistency
// You can also modify your existing code to use the createLoanCard function for credit cards:

function renderLoanCards(type, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const vendors = loanData[type];
  if (!vendors) return;
  
  container.innerHTML = vendors
    .map((vendor, index) => createLoanCard(vendor, index, type))
    .join("");
}

// Then update your DOMContentLoaded event to include:
document.addEventListener("DOMContentLoaded", function () {
  renderLoanCards("personal", "personalLoansContainer");
  renderLoanCards("business", "businessLoansContainer");
  renderLoanCards("emi", "emiCardsContainer");
  renderLoanCards("credit", "creditCardsContainer"); // This will now use the consistent createLoanCard function
});

