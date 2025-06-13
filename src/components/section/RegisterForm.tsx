"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic import untuk MapComponent agar tidak error di SSR
const MapComponent = dynamic(() => import("@/components/ui/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center shadow-md">
      <div className="text-gray-500">Memuat peta...</div>
    </div>
  ),
});

interface FormData {
  fullname: string;
  email: string;
  whatsapp: string;
  city: string;
  address: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    email: "",
    whatsapp: "",
    city: "",
    address: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validasi password
    if (formData.password !== formData.confirmPassword) {
      alert("Password tidak cocok!");
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Pendaftaran berhasil! Selamat datang di Rainy Gurl!");

      // Reset form
      setFormData({
        fullname: "",
        email: "",
        whatsapp: "",
        city: "",
        address: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      alert("Terjadi kesalahan. Silakan coba lagi.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-pink-600 mb-2">
              Formulir Pendaftaran Member
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Isi data Anda dengan benar untuk bergabung sebagai member Rainy
              Gurl.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Kolom Kiri */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="fullname"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Nama Lengkap
                    </Label>
                    <Input
                      id="fullname"
                      name="fullname"
                      type="text"
                      placeholder="Masukkan nama lengkap Anda"
                      value={formData.fullname}
                      onChange={handleInputChange}
                      required
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Email Aktif
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Contoh: kamu@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="whatsapp"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Nomor WhatsApp
                    </Label>
                    <Input
                      id="whatsapp"
                      name="whatsapp"
                      type="tel"
                      placeholder="08xxxxxxxxxx"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      required
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="city"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Kota
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      type="text"
                      placeholder="Contoh: Jakarta"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                    />
                  </div>
                </div>

                {/* Kolom Kanan */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="address"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Alamat Lengkap
                    </Label>
                    <Textarea
                      id="address"
                      name="address"
                      placeholder="Masukkan alamat lengkap Anda"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-400 min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="username"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Username
                    </Label>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Buat username Anda"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Buat password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Ulangi Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Masukkan ulang password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                    />
                  </div>
                </div>
              </div>

              {/* Section Peta */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-pink-600" />
                  <Label className="text-lg font-semibold text-gray-700">
                    Lokasi Alamat Anda
                  </Label>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-4">
                    Peta akan menampilkan lokasi berdasarkan alamat dan kota
                    yang Anda masukkan di atas.
                  </p>
                  <MapComponent
                    address={formData.address}
                    city={formData.city}
                  />
                </div>
              </div>

              {/* Tombol Submit */}
              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50"
                >
                  {isSubmitting ? "Mendaftar..." : "Gabung Sekarang"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
