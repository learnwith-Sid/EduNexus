import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import ThreeJSBackground from './components/ThreeJSBackground';
import Footer from './components/Footer';
import { ServiceIcon1, ServiceIcon2, ServiceIcon3 } from './components/Icons';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const AnimateOnScroll = ({ children, threshold = 0.1, className = '' }) => {
    const [containerRef, isVisible] = useIntersectionObserver({ threshold });
    return <div ref={containerRef} className={`${className} transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>{children}</div>;
};

// Updated Hero Section to be full-screen
const HeroSection = () => {
    const navigate = useNavigate();
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4">
            <AnimateOnScroll>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">The Future of School Management</h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-200">Streamline administration, empower teachers, and engage parents with our all-in-one platform.</p>
                <button onClick={() => navigate('/login')} className="mt-8 px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full hover:scale-105 transform transition-transform duration-300">Explore Features</button>
            </AnimateOnScroll>
        </div>
    );
};

const ServicesSection = () => {
    const services = [
        { icon: ServiceIcon1, title: "Student & Staff Management", description: "Centralized database for all student and staff information." },
        { icon: ServiceIcon2, title: "Academic Planning", description: "Easily manage timetables, examinations, and curriculum planning." },
        { icon: ServiceIcon3, title: "Finance & Billing", description: "Automate fee collection, manage payroll, and generate reports." },
    ];
    return (
        <div id="services" className="py-24 px-4 bg-black/20 backdrop-blur-sm">
            <h2 className="text-4xl font-bold text-center text-white mb-4">Why Choose Us?</h2>
            <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">Our platform is designed to simplify complexity and bring efficiency to every aspect of school operations.</p>
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                {services.map(service => (
                    <div key={service.title} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 text-center transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20">
                        <div className="flex justify-center mb-4"><service.icon className="w-12 h-12 text-blue-400"/></div>
                        <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                        <p className="text-gray-300">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AboutSection = () => (
    <div id="about" className="py-24 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
                <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2670&auto=format&fit=crop" 
                    alt="Team working together" 
                    className="rounded-lg shadow-2xl"
                />
            </div>
            <div>
                <h2 className="text-4xl font-bold text-white mb-4">About EduNexus</h2>
                <p className="text-gray-300 mb-6">EduNexus was founded by a team of educators and technologists who believe in the power of technology to transform education. We saw the administrative burdens that schools face and set out to create a unified, intuitive platform to solve them.</p>
                <p className="text-gray-300">Our mission is to empower educational institutions by providing tools that are powerful, easy to use, and accessible to everyone—from administrators and teachers to students and parents.</p>
            </div>
        </div>
    </div>
);

const TestimonialsSection = () => {
    const testimonials = [
        { quote: "This portal has revolutionized how we manage our school. It's intuitive and powerful.", author: "Principal Jane Doe", school: "Springfield Academy" },
        { quote: "Having all my class information and student records in one place is a game-changer.", author: "Mr. John Smith", school: "Northwood High" },
        { quote: "The billing and finance module is fantastic. Fee collection is now automated and transparent.", author: "Sarah Lee", school: "Oakridge International" },
    ];
    return (
        <div id="testimonials" className="py-24 px-4 bg-black/20 backdrop-blur-sm">
            <h2 className="text-4xl font-bold text-center text-white mb-12">Loved by Educators Worldwide</h2>
            <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
                {testimonials.map(testimonial => (
                    <div key={testimonial.author} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 transition-all duration-300 ease-in-out hover:scale-105 hover:border-white/20 hover:shadow-lg hover:shadow-blue-500/10">
                        <p className="text-gray-200 mb-6">"{testimonial.quote}"</p>
                        <div>
                            <p className="font-semibold text-white">{testimonial.author}</p>
                            <p className="text-sm text-blue-400">{testimonial.school}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CTASection = () => {
    const navigate = useNavigate();
    return (
        <div id="contact" className="py-24 text-center px-4">
            <h2 className="text-4xl font-bold text-white">Ready to Transform Your School?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">Join hundreds of institutions already streamlining their operations with EduNexus.</p>
            <button onClick={() => navigate('/login')} className="mt-8 px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full hover:scale-105 transform transition-transform duration-300">
                Request a Demo
            </button>
        </div>
    );
};


const HomePage = ({ isThreeJsLoaded }) => {
    const homeNavItems = [
        { name: "Services", path: "/#services" },
        { name: "About", path: "/#about" },
        { name: "Testimonials", path: "/#testimonials" },
        { name: "Contact", path: "/#contact" }
    ];
    return (
        <div className="text-white">
            <ThreeJSBackground isLoaded={isThreeJsLoaded} />
            <div className="relative z-10">
                <AppHeader navItems={homeNavItems} />
                <main>
                    <HeroSection />
                    <AnimateOnScroll><ServicesSection /></AnimateOnScroll>
                    <AnimateOnScroll><AboutSection /></AnimateOnScroll>
                    <AnimateOnScroll><TestimonialsSection /></AnimateOnScroll>
                    <AnimateOnScroll><CTASection /></AnimateOnScroll>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default HomePage;
