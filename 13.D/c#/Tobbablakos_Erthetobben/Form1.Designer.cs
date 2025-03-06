namespace Tobbablakos_Erthetobben
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            button_oda = new Button();
            SuspendLayout();
            // 
            // button_oda
            // 
            button_oda.Location = new Point(363, 382);
            button_oda.Name = "button_oda";
            button_oda.Size = new Size(75, 23);
            button_oda.TabIndex = 0;
            button_oda.Text = "Oda";
            button_oda.UseVisualStyleBackColor = true;
            button_oda.Click += button_oda_Click;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(button_oda);
            Name = "Form1";
            Text = "Form1";
            ResumeLayout(false);
        }

        #endregion

        private Button button_oda;
    }
}
