import React from "react";
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
    return (
        <footer className="text-gray-200 py-8" style={{ backgroundColor: "#ed8761" }}>
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* About Section */}
                <div>
                    <h2 className="text-lg font-bold text-black mb-3">Boardtschek</h2>
                    <p className="text-sm text-black">
                        Boardtschek is a platform that brings people together to explore and share ideas. Join us to start your journey.
                    </p>
                </div>

                {/* Links Section */}
                <div>
                    <h2 className="text-lg font-bold text-black mb-3">Quick Links</h2>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="/about" className="text-black">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="text-black">
                                Contact
                            </a>
                        </li>
                        <li>
                            <a href="/blog" className="text-black">
                                Blog
                            </a>
                        </li>
                        <li>
                            <a href="/privacy" className="text-black">
                                Privacy Policy
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Social Media Section */}
                <div>
                    <h2 className="text-lg font-bold text-black mb-3">Follow Us</h2>
                    <div className="flex space-x-4">
                        <Button variant="outline" className="p-2">
                            <span className="sr-only">Facebook</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="black"
                                viewBox="0 0 24 24"
                                className="h-6 w-6 text-gray-200"
                            >
                                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.406.593 24 1.325 24h11.495v-9.294H9.905v-3.622h2.916V8.413c0-2.89 1.764-4.465 4.34-4.465 1.235 0 2.296.092 2.603.133v3.021l-1.786.001c-1.403 0-1.675.668-1.675 1.647v2.164h3.346l-.436 3.622h-2.91V24h5.703c.73 0 1.324-.594 1.324-1.325V1.325C24 .593 23.406 0 22.675 0z" />
                            </svg>
                        </Button>
                        <Button variant="outline" className="p-2">
                            <span className="sr-only">Twitter</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="black"
                                viewBox="0 0 24 24"
                                className="h-6 w-6 text-black-200"
                            >
                                <path d="M24 4.557a9.828 9.828 0 01-2.828.775 4.932 4.932 0 002.165-2.723 9.865 9.865 0 01-3.127 1.195 4.918 4.918 0 00-8.379 4.482c-4.086-.2-7.715-2.165-10.141-5.144a4.932 4.932 0 001.524 6.573 4.89 4.89 0 01-2.228-.616v.061a4.917 4.917 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.92 4.92 0 004.6 3.42A9.869 9.869 0 010 21.54a13.94 13.94 0 007.548 2.213c9.058 0 14.01-7.514 14.01-14.015 0-.213-.005-.426-.015-.637A10.02 10.02 0 0024 4.557z" />
                            </svg>
                        </Button>
                        <Button variant="outline" className="p-2">
                            <span className="sr-only">Instagram</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="black"
                                viewBox="0 0 24 24"
                                className="h-6 w-6 text-black-200"
                            >
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.313 3.608 1.29.975.976 1.226 2.243 1.288 3.608.058 1.267.07 1.646.07 4.849s-.012 3.583-.07 4.849c-.062 1.366-.313 2.633-1.288 3.608-.975.975-2.242 1.227-3.608 1.288-1.267.058-1.646.07-4.849.07s-3.583-.012-4.849-.07c-1.366-.062-2.633-.313-3.608-1.288-.975-.975-1.226-2.242-1.288-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.583.07-4.849c.062-1.366.313-2.633 1.288-3.608.975-.975 2.242-1.226 3.608-1.288C8.417 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.015 7.052.07c-1.393.062-2.812.324-3.955 1.467C2.965 2.964 2.704 4.383 2.642 5.776c-.056 1.281-.071 1.69-.071 4.224s.015 2.943.071 4.224c.062 1.393.324 2.812 1.467 3.955 1.143 1.143 2.562 1.405 3.955 1.467 1.281.056 1.69.071 4.224.071s2.943-.015 4.224-.071c1.393-.062 2.812-.324 3.955-1.467 1.143-1.143 1.405-2.562 1.467-3.955.056-1.281.071-1.69.071-4.224s-.015-2.943-.071-4.224c-.062-1.393-.324-2.812-1.467-3.955-1.143-1.143-2.562-1.405-3.955-1.467C15.584.015 15.204 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4.162 4.162 0 110-8.324 4.162 4.162 0 010 8.324zm6.406-11.845a1.44 1.44 0 11-2.881 0 1.44 1.44 0 012.881 0z" />
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-black">
                © {new Date().getFullYear()} Boardtschek. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
