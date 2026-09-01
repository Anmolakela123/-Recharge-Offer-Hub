# Recharge Offer Hub — GitHub Pages

Static demo recharge website for GitHub Pages.

## Important QR fix
The seven supplied QR PNGs are embedded directly into `script.js` as data URLs. This avoids GitHub Pages path/case/path-depth problems that can prevent QR images from loading.

Plans: ₹499, ₹449, ₹399, ₹349, ₹299, ₹199, ₹999. Each plan opens its matching QR.

Demo flow: select operator → enter 10-digit number → Recharge Now → select plan → matching QR popup → upload payment screenshot → demo success popup.

This is a front-end demo; it does not verify UPI payments or perform real operator recharge.
