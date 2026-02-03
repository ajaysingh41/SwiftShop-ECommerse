# SwiftShop 🛒
**A Modern, Fully Functional Single-Page E-Commerce Experience**

SwiftShop is a lightweight, high-performance "Single File" frontend application designed to demonstrate the power of Vanilla JavaScript, CSS3, and HTML5. It features a complete shopping flow—from user authentication to order confirmation—without the need for external frameworks like React or Vue.

## ✨ Key Features

* **Single-Page Architecture:** Smooth navigation between Home, Shop, Product Details, and Cart without page reloads.
* **Secure Gateway:** A beautiful, gradient-styled login portal that protects the storefront.
* **Dynamic Product Engine:** Real-time search and category filtering for a seamless browsing experience.
* **Advanced Cart System:** * Persistent storage using `localStorage`.
    * Real-time quantity adjustments.
    * Interactive "Added!" feedback on buttons (replaces intrusive alerts).
* **Dark Mode Support:** A built-in theme engine to toggle between Light and Dark modes.
* **Fully Responsive:** Optimized for desktop, tablet, and mobile devices using CSS Flexbox and Grid.

## 🚀 Tech Stack

* **HTML5:** Semantic structure for SEO and accessibility.
* **CSS3:** Custom properties (variables), modern gradients, glassmorphism, and animations.
* **Vanilla JavaScript:** Custom DOM manipulation, state management, and event handling.

## 📸 Screenshots

> *Note: Since this is a single file project, images are rendered using placeholders/hints. You can easily replace the URLs in the `products` array with your own assets.*

## 🛠️ Installation & Usage

1.  Clone the repository:
    ```bash
    git clone [https://github.com/yourusername/swiftshop.git](https://github.com/yourusername/swiftshop.git)
    ```
2.  Navigate to the project folder:
    ```bash
    cd swiftshop
    ```
3.  Open `index.html` in any modern web browser.

## 📁 Project Structure

The project follows a "One-File" philosophy:
- `index.html`: Contains all the HTML markup.
- `<style>`: Contains the entire design system and responsiveness logic.
- `<script>`: Contains the application logic, product data, and cart state.

## 📝 How to Add Your Own Images

To personalize the store with your own product photos:
1. Open `index.html`.
2. Scroll to the `products` array inside the `<script>` tag.
3. Replace the `image` URL property with your local path (e.g., `img/my-item.jpg`) or a web link.

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Created as a College Minor Project to showcase Frontend Engineering and UI/UX Design skills.*
