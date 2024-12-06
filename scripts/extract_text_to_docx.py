import sys
from PIL import Image
from docx import Document
import pytesseract

# Set the path to Tesseract OCR executable
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def extract_text_to_docx(image_path, docx_path):
    try:
        # Step 1: Extract text from the image
        image = Image.open(image_path)
        extracted_text = pytesseract.image_to_string(image)
        print("Extracted Text:", extracted_text)

        # Step 2: Save the extracted text to a DOCX file
        document = Document()
        document.add_paragraph(extracted_text)
        document.save(docx_path)
        print(f"Extracted text saved to {docx_path}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python extract_text_to_docx.py <image_path> <docx_path>")
        sys.exit(1)

    # Get paths from command-line arguments
    image_path = sys.argv[1]
    docx_path = sys.argv[2]

    extract_text_to_docx(image_path, docx_path)
