import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "../ProductDetail";
import { vi } from "vitest";

// mock API
vi.mock("../../api", () => {
  return {
    fetchProducts: vi.fn(),
  };
});

import { fetchProducts } from "../../api";

describe("ProductDetail", () => {
  beforeEach(() => {
    fetchProducts.mockReset();
  });

  it("renders product details when product exists", async () => {
    const mockProduct = {
      id: "1",
      name: "น้ำมะพร้าวคลาสสิค",
      images: ["/img1.jpg", "/img2.jpg"],
      description: "คำอธิบายสินค้าทดสอบ",
      price: 45.5,
      rating: 4.6,
      producer: "เกษตรกรสมหมาย",
      producerLocation: "จังหวัดทดสอบ",
      ingredients: ["มะพร้าว"],
      usage: ["เขย่าแล้วดื่ม"],
      certifications: ["อย.", "GMP"],
      contact: "https://line.me/test",
      isAvailable: true,
      category: "เครื่องดื่ม"
    };
    fetchProducts.mockResolvedValue([mockProduct]);

    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // wait for product name to appear
    expect(await screen.findByText("น้ำมะพร้าวคลาสสิค")).toBeInTheDocument();
    expect(screen.getByText(/คำอธิบายสินค้าทดสอบ/)).toBeInTheDocument();
    expect(screen.getByText("฿45.50")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ติดต่อผู้ขาย/i })).toHaveAttribute("href", "https://line.me/test");
  });

  it("shows not found when product missing", async () => {
    fetchProducts.mockResolvedValue([]);
    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/Product not found/i)).toBeInTheDocument();
  });
});