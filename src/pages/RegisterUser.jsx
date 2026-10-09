import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Register() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    property_type: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    await supabase.from("registered_users").insert([
      {
        id: data.user.id,
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        property_type: formData.property_type,
      },
    ]);

    alert("Registration Successful");
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <form onSubmit={handleRegister} className="space-y-4">

        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          onChange={handleChange}
          className="border p-3 w-full"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-3 w-full"
        />

        <input
          type="text"
          name="phone"
          placeholder="Contact Number"
          onChange={handleChange}
          className="border p-3 w-full"
        />

        <select
          name="property_type"
          onChange={handleChange}
          className="border p-3 w-full"
        >
          <option value="">Select Property Type</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Commercial">Commercial</option>
          <option value="Plot">Plot</option>
        </select>

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-3 w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded w-full"
        >
          Register
        </button>

      </form>
    </div>
  );
}