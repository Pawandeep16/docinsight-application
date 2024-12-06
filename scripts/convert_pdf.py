import sys
from pdf2docx import Converter

def convert_pdf_to_word(pdf_path, word_path):
    try:
        cv = Converter(pdf_path)
        print(f"Converting {pdf_path} to {word_path}...")
        cv.convert(word_path, start=0, end=None)
        cv.close()
        print("Conversion completed!")
    except Exception as e:
        print(f"Error during conversion: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python convert_pdf.py <pdf_path> <word_path>")
        sys.exit(1)

    pdf_path = sys.argv[1]
    word_path = sys.argv[2]

    convert_pdf_to_word(pdf_path, word_path)
