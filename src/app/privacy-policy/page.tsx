import schoolImg from "@/../public/school-gym-illustration.jpg";
import { Container } from "@/components/layout";

const privacyPolicyContent = {
  lastUpdated: "March 11, 2025",
  welcome:
    "Thank you for using RateMySchools.com. This Privacy Policy explains how we collect, use, and disclose your information when you use our website.",
  sections: [
    {
      title: "1. Information We Collect",
      content: `
        Personal Information: We may collect personal information from you, such as your email address, only if you voluntarily provide it to us. This information is collected solely for verification. Providing your email address is optional, and you can still use our website anonymously.
        
        User-Generated Content: When you submit reviews or upload photos of schools, you are providing us with user-generated content. By uploading photos, you grant us permission to use these photos on our website for displaying dorm information and reviews.
        
        Automatically Collected Information: We may automatically collect certain information when you visit our website, including your browser type, operating system, IP address, and browsing behavior. This information is used for analytics and improving website performance.
        
        Cookies and Tracking: We use cookies and similar tracking technologies to enhance your experience. You may adjust your browser settings to refuse cookies, but this may limit certain functionalities.
      `,
    },
    {
      title: "2. Use of Information",
      content: `
        We use the information we collect to provide and personalize our services, including displaying school reviews and photos, enhancing user experience, and improving website functionality. If you provide your email address, we may use it to communicate with you regarding account-related matters and to send you updates and announcements related to school reviews and site improvements. You can opt out of non-essential communications, at any time.
      `,
    },
    {
      title: "3. Data Security",
      content: `
        We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
      `,
    },
    {
      title: "4. Sharing Your Information",
      content: `
        We do not sell, trade, or otherwise transfer your personal information to outside parties, except as required by law or for essential services like website hosting and analytics. Any third parties assisting us are required to keep your information confidential.
      `,
    },
    {
      title: "5. Children's Privacy",
      content: `
        Our website is not directed at individuals under 13, and we do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us and we will take appropriate steps to remove the information.
      `,
    },
    {
      title: "6. Legal Compliance",
      content: `
        We comply with applicable privacy laws, including the General Data Protection Regulation (GDPR). If you are a resident of these regions, you may have specific rights regarding your personal data, such as accessing, deleting, or restricting processing. To exercise these rights, please contact us.
      `,
    },
    {
      title: "7. Changes to this Privacy Policy",
      content: `
        We may update this Privacy Policy periodically. Any significant changes will be posted on this page with an updated revision date. We encourage users to review this policy regularly.
      `,
    },
    {
      title: "Contact Us",
      content: `
        If you have any questions or concerns about this Privacy Policy, please contact us.
      `,
    },
  ],
};

export default function PrivacyPolicy() {
  return (
    <>
      <div
        style={{
          // linear-gradient for black layer over the img
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)) ,url(${schoolImg.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="flex h-[300px] items-center justify-center"
      >
        <h1 className="text-3xl capitalize text-white">Privacy Policy</h1>
      </div>

      <Container>
        <div className="mx-auto max-w-[1200px] space-y-6 py-8 text-gray-700">
          <p>Last updated: {privacyPolicyContent.lastUpdated}</p>

          <p>{privacyPolicyContent.welcome}</p>

          {privacyPolicyContent.sections.map((section, index) => (
            <div key={index}>
              <h2 className="mt-6 text-lg font-medium">{section.title}</h2>
              <p className="m-0">{section.content}</p>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
