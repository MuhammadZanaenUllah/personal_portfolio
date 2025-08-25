"use client";
import { useState, useEffect } from "react";
import { supabase, getPersonalInfo, PersonalInfo } from "@/lib/supabase";

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export const dynamic = "force-dynamic";

export default function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [socialLinks, setSocialLinks] = useState<
    { name: string; url: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [personalData] = await Promise.all([getPersonalInfo()]);

        setPersonalInfo(personalData);
        // For now, we'll use static social links since they're not in the database
        setSocialLinks([
          { name: "GitHub", url: "https://github.com" },
          { name: "LinkedIn", url: "https://linkedin.com" },
          { name: "Twitter", url: "https://twitter.com" },
          { name: "Instagram", url: "https://instagram.com" },
          { name: "YouTube", url: "https://youtube.com" },
          { name: "Dev.to", url: "https://dev.to" },
        ]);
      } catch (err) {
        setError("Failed to load data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading contact information...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  if (!personalInfo) return null;



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
    setSubmitStatus("idle");

    try {
      const { error } = await supabase
        .from("contact_submissions")
        .insert([formData]);

      if (error) throw error;

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.name && formData.email && formData.subject && formData.message;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Let&apos;s Work Together
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind? I&apos;d love to hear about it. Let&apos;s
            discuss how we can bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="animate-fade-in-up animation-delay-200">
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Send me a message
              </h2>

              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                      <h3 className="font-semibold text-green-800">
                        Message sent successfully!
                      </h3>
                      <p className="text-green-600 text-sm">
                        I&apos;ll get back to you within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">❌</span>
                    <div>
                      <h3 className="font-semibold text-red-800">
                        Something went wrong
                      </h3>
                      <p className="text-red-600 text-sm">
                        Please try again or contact me directly.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white resize-none"
                    placeholder="Tell me about your project, ideas, or just say hello!"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full py-4 px-8 rounded-full font-semibold text-lg transition-all duration-300 ${
                    isFormValid && !isSubmitting
                      ? "bg-black text-white hover:bg-gray-800 hover:scale-105 hover:shadow-xl"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Send Message
                      <span className="text-xl">🚀</span>
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information & Social Links */}
          <div className="animate-fade-in-up animation-delay-400">
            {/* Quick Contact Info */}
            <div className="bg-white rounded-3xl p-8 shadow-xl mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Get in touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                    📧
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                    📱
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="text-gray-600 hover:text-green-600 transition-colors duration-300"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                    📍
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Location</h3>
                    <p className="text-gray-600">{personalInfo.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">
                    ⏰
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Response Time
                    </h3>
                    <p className="text-gray-600">Usually within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Connect with me
              </h2>
              <p className="text-gray-600 mb-8">
                Follow my work and connect on social media
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {socialLinks.map((social, index) => {
                  const getHoverColor = (name: string) => {
                    const colorMap: { [key: string]: string } = {
                      GitHub: "hover:bg-gray-800",
                      LinkedIn: "hover:bg-blue-600",
                      Twitter: "hover:bg-blue-400",
                      Instagram: "hover:bg-pink-500",
                      YouTube: "hover:bg-red-600",
                      "Dev.to": "hover:bg-gray-900",
                    };
                    return colorMap[name] || "hover:bg-gray-600";
                  };

                  const getIcon = (name: string) => {
                    const iconMap: { [key: string]: string } = {
                      GitHub: "🐙",
                      LinkedIn: "💼",
                      Twitter: "🐦",
                      Instagram: "📷",
                      YouTube: "📺",
                      "Dev.to": "💻",
                    };
                    return iconMap[name] || "🔗";
                  };

                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex flex-col items-center p-6 bg-gray-50 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${getHoverColor(
                        social.name
                      )} hover:text-white`}
                    >
                      <span className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                        {getIcon(social.name)}
                      </span>
                      <span className="font-semibold text-sm">
                        {social.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability Status */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-8 border border-green-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                <h3 className="text-xl font-bold text-gray-900">
                  Currently Available
                </h3>
              </div>
              <p className="text-gray-700 mb-4">
                I&apos;m currently accepting new projects and collaborations.
                Let&apos;s create something amazing together!
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm font-medium">
                  Web Development
                </span>
                <span className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm font-medium">
                  UI/UX Design
                </span>
                <span className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm font-medium">
                  Consulting
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 animate-fade-in-up animation-delay-600">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                What&apos;s your typical response time?
              </h3>
              <p className="text-gray-600">
                I usually respond to all inquiries within 24 hours. For urgent
                matters, feel free to reach out via phone or LinkedIn.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Do you work with international clients?
              </h3>
              <p className="text-gray-600">
                Absolutely! I work with clients worldwide and am comfortable
                with different time zones and communication preferences.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                What types of projects do you take on?
              </h3>
              <p className="text-gray-600">
                I specialize in web applications, e-commerce platforms, and
                custom software solutions. I&apos;m always open to discussing
                unique challenges.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Do you offer ongoing support?
              </h3>
              <p className="text-gray-600">
                Yes! I provide maintenance, updates, and ongoing support for all
                projects. We can discuss support packages that fit your needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
