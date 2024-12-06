import image1 from "../Assets/icons/Summary.png";
import customization from "../Assets/icons/template design.png"
import decission  from "../Assets/icons/Decission making.png"
import upload from  "../Assets/icons/documentUpload.png"
 
   export const components =  [
 
     {
      direction: "left",
      image: decission,
      heading:"AI-Powered Decision Making",
      description: "Utilize AI to analyze legal documents and extract critical information, helping you make informed decisions quickly and accurately."
    },
      {
        direction: "right",
        image: image1,
        heading:"Documnet Summerizing",
        description: "Generate easy-to-read summaries of complex legal documents, helping you quickly grasp essential information with the key points."
    },
      
       {
         direction: "left",
         image: customization,
         heading:"Customizable Templates",
         description: "Easily create and customize templates for various legal documents such as enrollments, job offers, contracts, and more."
       },
       {
        direction: "right",
        image: upload,
        heading:"Secure and Efficient File Handling",
        description: "Safely upload your legal documents with end-to-end encryption, ensuring data privacy and protection."
    },
      
    ]


// Pricing Plan
export const plans = [
  {
    plan: 'Free Trial',
    price: '0',
    features: ['7-day free trial to explore all premium features', 'Access to AI-driven document analysis tools', 'Collaboration for up to 3 users', '100 document uploads'],
  },
  {
    plan: 'Professional Plan',
    price: '79',
    features: ['Advanced Summarization', 'Customizable Templates', 'AI-Powered Decision Making', 'Priority Email Support'],
  },
  {
    plan: 'Enterprise Plan',
    price: 'Email Us',
    features: ['Dedicated Account Manager', 'Enhanced Security', 'API Access', '24/7 Support'],
  },
];
  