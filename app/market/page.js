"use client";
import React, { useEffect, useState } from "react";

// Small single-file marketplace React component
// - Adds, edits, deletes items
// - Persists to localStorage
// - Lists items with search, sort and filters
// - Simple buy/cart behaviour (decrement stock)
// - Tailwind classes for styling (no external libs required)

export default function SmallMarketplace() {
  const LS_KEY = "small_marketplace_items_v1";

  const sampleItems = [
    {
      id: cryptoRandomId(),
      title: "Handmade Mug",
      price: 12.5,
      image: "https://picsum.photos/seed/mug/400/300",
      description: "Ceramic mug, 350ml",
      stock: 10,
      createdAt: Date.now(),
    },
    {
      id: cryptoRandomId(),
      title: "Acrylic Poster",
      price: 8.0,
      image: "https://picsum.photos/seed/poster/400/300",
      description: "A3 poster, matte finish",
      stock: 5,
      createdAt: Date.now() - 1000 * 60 * 60,
    },
  ];

  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : sampleItems;
    } catch (e) {
      return sampleItems;
    }
  });

  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    stock: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [filterInStock, setFilterInStock] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (!notification) return;
    const t = setTimeout(() => setNotification(null), 3000);
    return () => clearTimeout(t);
  }, [notification]);

  function cryptoRandomId() {
    // small helper to produce unpredictable ids in-browser
    return (
      Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 9)
    );
  }

  function resetForm() {
    setForm({ title: "", price: "", image: "", description: "", stock: "" });
    setEditingId(null);
  }

  function validateForm() {
    if (!form.title.trim()) return "Title is required";
    if (
      !form.price ||
      Number.isNaN(Number(form.price)) ||
      Number(form.price) < 0
    )
      return "Price must be a valid non-negative number";
    if (!form.stock || parseInt(form.stock) < 0)
      return "Stock must be 0 or more";
    return null;
  }

  function handleAddOrUpdate(e) {
    e.preventDefault();
    const err = validateForm();
    if (err) {
      setNotification({ type: "error", message: err });
      return;
    }

    const payload = {
      id: editingId || cryptoRandomId(),
      title: form.title.trim(),
      price: Number(parseFloat(form.price).toFixed(2)),
      image:
        form.image ||
        `https://picsum.photos/seed/${Math.floor(
          Math.random() * 1000
        )}/400/300`,
      description: form.description.trim(),
      stock: Math.max(0, parseInt(form.stock)),
      createdAt: editingId
        ? items.find((i) => i.id === editingId).createdAt
        : Date.now(),
    };

    if (editingId) {
      setItems((prev) =>
        prev.map((it) => (it.id === editingId ? payload : it))
      );
      setNotification({ type: "success", message: "Item updated" });
    } else {
      setItems((prev) => [payload, ...prev]);
      setNotification({ type: "success", message: "Item added" });
    }

    resetForm();
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      price: String(item.price),
      image: item.image,
      description: item.description,
      stock: String(item.stock),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id) {
    if (!confirm("Delete this item?")) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
    setNotification({ type: "success", message: "Item deleted" });
  }

  function handleBuy(id) {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== id) return it;
        if (it.stock <= 0) {
          setNotification({ type: "error", message: "Out of stock" });
          return it;
        }
        setNotification({ type: "success", message: `Purchased ${it.title}` });
        return { ...it, stock: it.stock - 1 };
      })
    );
  }

  function formattedPrice(p) {
    return `$${Number(p).toFixed(2)}`;
  }

  // filtering + sorting
  const visibleItems = items
    .filter(
      (it) =>
        it.title.toLowerCase().includes(query.toLowerCase()) ||
        it.description.toLowerCase().includes(query.toLowerCase())
    )
    .filter((it) => (filterInStock ? it.stock > 0 : true))
    .sort((a, b) => {
      if (sort === "newest") return b.createdAt - a.createdAt;
      if (sort === "oldest") return a.createdAt - b.createdAt;
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-500 to-purple-500  p-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-extrabold">Small Marketplace</h1>
          <p className="text-sm text-gray-600">
            Add items, list, buy and manage — saved in your browser
          </p>
        </header>

        {/* notification */}
        {notification && (
          <div
            className={`p-2 mb-4 rounded ${
              notification.type === "error"
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {notification.message}
          </div>
        )}

        {/* ADD / EDIT FORM */}
        <form
          onSubmit={handleAddOrUpdate}
          className="bg-white p-4 rounded-lg shadow mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                className="mt-1 block w-full border rounded px-2 py-1"
                placeholder="Item title"
              />
            </div>

            <div className="w-36">
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                value={form.price}
                onChange={(e) =>
                  setForm((f) => ({ ...f, price: e.target.value }))
                }
                className="mt-1 block w-full border rounded px-2 py-1"
                placeholder="0.00"
                inputMode="decimal"
              />
            </div>

            <div className="w-32">
              <label className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                value={form.stock}
                onChange={(e) =>
                  setForm((f) => ({ ...f, stock: e.target.value }))
                }
                className="mt-1 block w-full border rounded px-2 py-1"
                placeholder="0"
                inputMode="numeric"
              />
            </div>
          </div>

          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700">
              Image URL (optional)
            </label>
            <input
              value={form.image}
              onChange={(e) =>
                setForm((f) => ({ ...f, image: e.target.value }))
              }
              className="mt-1 block w-full border rounded px-2 py-1"
              placeholder="https://..."
            />
          </div>

          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              className="mt-1 block w-full border rounded px-2 py-1"
              rows={2}
              placeholder="Short description"
            />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
            >
              {editingId ? "Update Item" : "Add Item"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-3 py-2 border rounded text-sm"
            >
              Reset
            </button>
            <div className="ml-auto text-sm text-gray-500">
              Items: <span className="font-medium">{items.length}</span>
            </div>
          </div>
        </form>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border rounded px-3 py-2"
            placeholder="Search items by title or description..."
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="price-asc">Price: low → high</option>
            <option value="price-desc">Price: high → low</option>
          </select>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filterInStock}
              onChange={(e) => setFilterInStock(e.target.checked)}
            />
            In stock only
          </label>

          <button
            onClick={() => {
              if (!confirm("Reset all items to sample dataset?")) return;
              setItems(sampleItems);
              setNotification({
                type: "success",
                message: "Reset to sample items",
              });
            }}
            className="ml-auto md:ml-0 px-3 py-2 text-sm border rounded"
          >
            Reset sample
          </button>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow overflow-hidden flex flex-col"
            >
              <div className="h-40 bg-gray-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">
                      {formattedPrice(item.price)}
                    </div>
                    <div className="text-xs text-gray-500">
                      Stock: {item.stock}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleBuy(item.id)}
                    className={`flex-1 px-2 py-1 rounded ${
                      item.stock > 0
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-gray-200 text-gray-600 cursor-not-allowed"
                    }`}
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 border rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 border rounded text-red-600"
                  >
                    Delete
                  </button>
                </div>

                <div className="mt-3 text-xs text-gray-400">
                  Added: {new Date(item.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {visibleItems.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No items found — try changing the search or filters.
          </div>
        )}

        <footer className="mt-8 text-center text-sm text-gray-500">
          This is a demo marketplace (no payments). Data stored in your browser.
        </footer>
      </div>
    </div>
  );
}
