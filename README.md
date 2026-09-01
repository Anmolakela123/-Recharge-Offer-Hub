# Recharge Plans — GitHub Pages Demo

## Upload
Upload the complete folder contents to a GitHub repository and enable GitHub Pages.

## Included
- Responsive mobile/desktop recharge UI inspired by the supplied reference screenshots.
- 7 fixed-amount QR images:
  ₹499, ₹449, ₹399, ₹349, ₹299, ₹199, ₹999.
- Mobile number popup.
- Plan selection and fixed QR display.
- Payment screenshot validation (PNG/JPG/WEBP, max 5 MB).
- Screenshot preview.
- Green success popup showing the number, plan, amount and "Within 10 minutes".
- No admin approval screen.

## Important
This is a front-end/demo implementation. GitHub Pages is static hosting, so it cannot securely verify a UPI payment or automatically trigger a real recharge. The success popup is intentionally a demo confirmation after screenshot upload. For real automatic payment verification and real recharge, a secure backend/payment/recharge API is required.


## Operator behavior
Jio and Airtel now show the same seven plan amounts and the same plan benefits. The selected operator only changes the operator label and payment flow; the fixed QR is selected by amount. Switch Jio/Airtel from the top operator switch or from the mobile-number popup.
