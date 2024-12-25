import tkinter as tk
from tkinter import filedialog, messagebox, ttk
from graphviz2drawio import graphviz2drawio
from pathlib import Path
import warnings
import os

class DotConverterGUI:
    def __init__(self, root):
        """Initialize the GUI application"""
        self.root = root
        self.root.title("DOT to Draw.io Converter")
        
        # Set default directory
        self.default_directory = r"D:\AboutCoding\AndroidDev_CourseCode\AndroidFinalProject"
        
        # Configure window
        self.root.geometry("600x400")
        self.root.resizable(True, True)
        
        # Configure style
        self.style = ttk.Style()
        self.style.configure('TButton', padding=5)
        self.style.configure('TLabel', padding=5)
        
        self.create_widgets()
        self.center_window()

    def center_window(self):
        """Center the window on the screen"""
        self.root.update_idletasks()
        width = self.root.winfo_width()
        height = self.root.winfo_height()
        x = (self.root.winfo_screenwidth() // 2) - (width // 2)
        y = (self.root.winfo_screenheight() // 2) - (height // 2)
        self.root.geometry(f'{width}x{height}+{x}+{y}')

    def create_widgets(self):
        """Create and arrange GUI widgets"""
        # Main frame
        main_frame = ttk.Frame(self.root, padding="10")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # Configure grid
        self.root.columnconfigure(0, weight=1)
        self.root.rowconfigure(0, weight=1)
        main_frame.columnconfigure(1, weight=1)
        
        # Input file section
        ttk.Label(main_frame, text="Input DOT File:").grid(row=0, column=0, sticky=tk.W)
        self.input_path_var = tk.StringVar()
        input_entry = ttk.Entry(main_frame, textvariable=self.input_path_var)
        input_entry.grid(row=0, column=1, sticky=(tk.W, tk.E), padx=5)
        ttk.Button(main_frame, text="Browse", command=self.browse_input).grid(row=0, column=2)
        
        # Output file section
        ttk.Label(main_frame, text="Output XML File:").grid(row=1, column=0, sticky=tk.W)
        self.output_path_var = tk.StringVar()
        output_entry = ttk.Entry(main_frame, textvariable=self.output_path_var)
        output_entry.grid(row=1, column=1, sticky=(tk.W, tk.E), padx=5)
        ttk.Button(main_frame, text="Browse", command=self.browse_output).grid(row=1, column=2)
        
        # Convert button
        convert_button = ttk.Button(main_frame, text="Convert", command=self.convert_file)
        convert_button.grid(row=2, column=0, columnspan=3, pady=20)
        
        # Status text
        self.status_text = tk.Text(main_frame, height=10, width=50, wrap=tk.WORD)
        self.status_text.grid(row=3, column=0, columnspan=3, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # Add scrollbar to status text
        scrollbar = ttk.Scrollbar(main_frame, orient=tk.VERTICAL, command=self.status_text.yview)
        scrollbar.grid(row=3, column=3, sticky=(tk.N, tk.S))
        self.status_text.configure(yscrollcommand=scrollbar.set)

    def browse_input(self):
        """Open file dialog for selecting input DOT file"""
        filename = filedialog.askopenfilename(
            initialdir=self.default_directory,
            title="Select DOT file",
            filetypes=(("DOT files", "*.dot"), ("All files", "*.*"))
        )
        if filename:
            self.input_path_var.set(filename)
            # Automatically set output filename
            output_path = Path(filename).with_suffix('.xml')
            self.output_path_var.set(str(output_path))

    def browse_output(self):
        """Open file dialog for selecting output XML file location"""
        filename = filedialog.asksaveasfilename(
            initialdir=self.default_directory,
            title="Save XML file",
            filetypes=(("XML files", "*.xml"), ("All files", "*.*")),
            defaultextension=".xml"
        )
        if filename:
            self.output_path_var.set(filename)

    def log_message(self, message):
        """Add message to status text area"""
        self.status_text.insert(tk.END, message + "\n")
        self.status_text.see(tk.END)
        self.root.update()

    def convert_file(self):
        """Convert DOT file to Draw.io XML format"""
        input_path = self.input_path_var.get()
        output_path = self.output_path_var.get()
        
        if not input_path or not output_path:
            messagebox.showerror("Error", "Please select both input and output files")
            return
            
        try:
            # Suppress runtime warnings
            warnings.filterwarnings("ignore", category=RuntimeWarning)
            
            # Read DOT file
            self.log_message("Reading input file...")
            dot_path = Path(input_path)
            dot_content = dot_path.read_text(encoding="utf-8")
            
            # Convert content
            self.log_message("Converting DOT to Draw.io format...")
            xml_content = graphviz2drawio.convert(dot_content)
            
            # Save as XML
            self.log_message("Saving output file...")
            xml_path = Path(output_path)
            xml_path.write_text(xml_content, encoding="utf-8")
            
            self.log_message(f"Successfully converted {input_path} to {output_path}")
            messagebox.showinfo("Success", "Conversion completed successfully!")
            
        except UnicodeDecodeError as e:
            error_msg = "Encoding error: Please ensure the DOT file is saved with UTF-8 encoding"
            self.log_message(error_msg)
            messagebox.showerror("Error", error_msg)
            
        except Exception as e:
            error_msg = f"An error occurred: {str(e)}"
            self.log_message(error_msg)
            messagebox.showerror("Error", error_msg)

def main():
    """Main entry point for the application"""
    root = tk.Tk()
    app = DotConverterGUI(root)
    root.mainloop()

if __name__ == "__main__":
    main()