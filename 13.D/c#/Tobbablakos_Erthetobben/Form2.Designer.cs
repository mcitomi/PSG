namespace Tobbablakos_Erthetobben
{
    partial class Form2
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
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
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            button_vissza = new Button();
            SuspendLayout();
            // 
            // button_vissza
            // 
            button_vissza.Location = new Point(358, 372);
            button_vissza.Name = "button_vissza";
            button_vissza.Size = new Size(75, 23);
            button_vissza.TabIndex = 0;
            button_vissza.Text = "Vissza";
            button_vissza.UseVisualStyleBackColor = true;
            button_vissza.Click += button_vissza_Click;
            // 
            // Form2
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(800, 450);
            Controls.Add(button_vissza);
            Name = "Form2";
            Text = "Form2";
            ResumeLayout(false);
        }

        #endregion

        private Button button_vissza;
    }
}