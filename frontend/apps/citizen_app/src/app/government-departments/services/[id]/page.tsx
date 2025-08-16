'use client';
import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { CitizenHeader, Heading, Button } from "@myorg/ui";

interface ServicePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ServicePage({ params }: ServicePageProps) {
  const resolvedParams = use(params);

  // Mock data - in real app this would be fetched based on resolvedParams.id
  const getServiceData = (id: string) => {
    const services = {
      "1": {
        id: "1",
        name: "Sri Lanka Administrative Service",
        description: "The Sri Lanka Administrative Service (SLAS) is the premier service of the Government of Sri Lanka, responsible for policy formulation, implementation, and administration of government functions at the highest level.",
        fullDescription: "The Sri Lanka Administrative Service plays a crucial role in the governance structure of the country. Officers of this service are responsible for strategic planning, policy development, and ensuring effective implementation of government decisions across all sectors.",
        address: "General Treasury Building, Colombo 01, Sri Lanka",
        phone: "+94 11 2484000",
        email: "info@treasury.gov.lk",
        workingHours: "Monday - Friday: 8:30 AM - 4:15 PM",
        services: [
          "Policy Development and Analysis",
          "Strategic Planning and Implementation",
          "Administrative Coordination",
          "Public Service Management",
          "Inter-ministerial Liaison",
          "Project Management and Oversight"
        ],
        requirements: [
          "Valid National Identity Card",
          "Relevant educational qualifications",
          "Application form (duly completed)",
          "Character certificates",
          "Medical fitness certificate"
        ],
        image: "/img1.jpg"
      },
      "2": {
        id: "2",
        name: "Sri Lanka Engineering Service",
        description: "The Sri Lanka Engineering Service provides technical expertise and engineering solutions for national infrastructure development, public works, and specialized engineering projects.",
        fullDescription: "This service encompasses various engineering disciplines including civil, mechanical, electrical, and other specialized fields. Officers contribute to national development through design, construction, maintenance, and management of critical infrastructure projects.",
        address: "Ministry of Highways, 1056, Maradana Road, Colombo 10",
        phone: "+94 11 2691216",
        email: "info@highways.gov.lk",
        workingHours: "Monday - Friday: 8:30 AM - 4:15 PM",
        services: [
          "Infrastructure Design and Planning",
          "Project Management and Supervision",
          "Technical Consultancy Services",
          "Quality Assurance and Control",
          "Maintenance and Asset Management",
          "Engineering Standards Development"
        ],
        requirements: [
          "Engineering degree from recognized university",
          "Professional engineering registration",
          "Valid National Identity Card",
          "Technical portfolio and experience certificates",
          "Application form with supporting documents"
        ],
        image: "/img1.jpg"
      },
      "3": {
        id: "3",
        name: "Sri Lanka Accountants' Service",
        description: "The Sri Lanka Accountants' Service manages financial operations, budgeting, auditing, and accounting functions across government institutions and public sector organizations.",
        fullDescription: "This service ensures proper financial management, transparency, and accountability in public sector financial operations. Officers are responsible for budget preparation, financial analysis, audit coordination, and compliance with financial regulations.",
        address: "Ministry of Finance, The Secretariat, Colombo 01",
        phone: "+94 11 2484000",
        email: "info@treasury.gov.lk",
        workingHours: "Monday - Friday: 8:30 AM - 4:15 PM",
        services: [
          "Financial Planning and Analysis",
          "Budget Preparation and Management",
          "Audit Coordination and Compliance",
          "Financial Reporting and Documentation",
          "Cost Management and Control",
          "Treasury Operations Management"
        ],
        requirements: [
          "Professional accounting qualification",
          "Valid National Identity Card",
          "Experience in public sector accounting",
          "Knowledge of government financial regulations",
          "Application with relevant certificates"
        ],
        image: "/img1.jpg"
      },
      // Add default service data for other IDs
      "default": {
        id: resolvedParams.id,
        name: "Government Service",
        description: "This government service provides essential public administration and citizen services to support national development and public welfare.",
        fullDescription: "Our dedicated team of professionals works to ensure efficient service delivery, maintaining high standards of public administration and citizen satisfaction.",
        address: "Government Service Center, Colombo 01, Sri Lanka",
        phone: "+94 11 2000000",
        email: "info@gov.lk",
        workingHours: "Monday - Friday: 8:30 AM - 4:15 PM",
        services: [
          "General Public Services",
          "Documentation and Certification",
          "Information and Guidance",
          "Application Processing",
          "Consultation Services",
          "Administrative Support"
        ],
        requirements: [
          "Valid National Identity Card",
          "Completed application form",
          "Supporting documents as required",
          "Payment of applicable fees",
          "Compliance with service guidelines"
        ],
        image: "/img1.jpg"
      }
    };

    return services[id as keyof typeof services] || services["default"];
  };

  const service = getServiceData(resolvedParams.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
      {/* Header */}
      <CitizenHeader logoSrc="/logo.png" />
      
      <div className="px-4 pt-6 max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/government-departments/services"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Services
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Service Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Header */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-64">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-6">
                <Heading level={1} size="2xl" className="mb-4">
                  {service.name}
                </Heading>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <Heading level={2} size="xl" className="mb-4">
                About This Service
              </Heading>
              <p className="text-gray-700 leading-relaxed mb-6">
                {service.fullDescription}
              </p>

              {/* Services Offered */}
              <div className="mb-6">
                <Heading level={3} size="lg" className="mb-3">
                  Services Offered
                </Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.services.map((serviceItem, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span className="text-sm text-gray-700">{serviceItem}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div>
                <Heading level={3} size="lg" className="mb-3">
                  Requirements
                </Heading>
                <div className="space-y-2">
                  {service.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 font-semibold text-sm mt-0.5">{index + 1}.</span>
                      <span className="text-sm text-gray-700">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Info & Booking */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-6">
              {/* Contact Information */}
              <div className="mb-6">
                <Heading level={3} size="lg" className="mb-4">
                  Contact Information
                </Heading>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gray-600 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-sm text-gray-600">{service.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gray-600 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-sm text-gray-600">{service.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gray-600 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-600">{service.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gray-600 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                      <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900">Working Hours</p>
                      <p className="text-sm text-gray-600">{service.workingHours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="border-t pt-6">
                <Link href={`/government-departments/services/${service.id}/make-appointment`}>
                  <Button className="w-full py-4 text-lg font-semibold">
                    Check Available Slots
                  </Button>
                </Link>
                
                <p className="text-xs text-gray-500 text-center mt-2">
                  Book an appointment or consultation
                </p>
              </div>

              {/* Additional Info */}
              <div className="mt-6 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-800">
                  <strong>Note:</strong> Please bring all required documents when visiting. 
                  Online services may be available for certain procedures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
