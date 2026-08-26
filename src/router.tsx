import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components/layout/RootLayout";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { SobreNosotros } from "./pages/SobreNosotros";
import { Contacto } from "./pages/Contacto";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "producto/:slug", element: <ProductPage /> },
      { path: "sobre-nosotros", element: <SobreNosotros /> },
      { path: "contacto", element: <Contacto /> },
    ],
  },
]);
