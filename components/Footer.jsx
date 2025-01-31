"use client";

import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Name and Email */}
          <div className="text-center">
            <p className="text-lg font-semibold">Efemiaya Favour Oghenetega</p>
            <p className="text-sm text-gray-400">efemiayafavour@gmail.com</p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {/* GitHub */}
            <a
              href="https://github.com/Phavoa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-100 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/favour-efemiaya/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-100 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>

            {/* Email */}
            <a
              href="mailto:efemiayafavour@gmail.com"
              className="text-gray-400 hover:text-gray-100 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Efemiaya Favour. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;