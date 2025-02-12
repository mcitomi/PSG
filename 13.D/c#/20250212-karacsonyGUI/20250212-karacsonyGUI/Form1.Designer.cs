namespace _20250212_karacsonyGUI
{
    partial class Form1
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
            this.label1 = new System.Windows.Forms.Label();
            this.comboBox = new System.Windows.Forms.ComboBox();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.textBoxElkeszitett = new System.Windows.Forms.TextBox();
            this.textBoxEladott = new System.Windows.Forms.TextBox();
            this.buttonHozzaad = new System.Windows.Forms.Button();
            this.listBox = new System.Windows.Forms.ListBox();
            this.warningLabel = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(13, 34);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(63, 13);
            this.label1.TabIndex = 0;
            this.label1.Text = "Nap száma:";
            // 
            // comboBox
            // 
            this.comboBox.FormattingEnabled = true;
            this.comboBox.Location = new System.Drawing.Point(82, 30);
            this.comboBox.Name = "comboBox";
            this.comboBox.Size = new System.Drawing.Size(121, 21);
            this.comboBox.TabIndex = 1;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(231, 34);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(60, 13);
            this.label2.TabIndex = 2;
            this.label2.Text = "Elkeszített:";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(426, 34);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(43, 13);
            this.label3.TabIndex = 3;
            this.label3.Text = "Eladott:";
            // 
            // textBoxElkeszitett
            // 
            this.textBoxElkeszitett.Location = new System.Drawing.Point(297, 31);
            this.textBoxElkeszitett.Name = "textBoxElkeszitett";
            this.textBoxElkeszitett.Size = new System.Drawing.Size(100, 20);
            this.textBoxElkeszitett.TabIndex = 4;
            // 
            // textBoxEladott
            // 
            this.textBoxEladott.Location = new System.Drawing.Point(475, 31);
            this.textBoxEladott.Name = "textBoxEladott";
            this.textBoxEladott.Size = new System.Drawing.Size(100, 20);
            this.textBoxEladott.TabIndex = 5;
            // 
            // buttonHozzaad
            // 
            this.buttonHozzaad.Location = new System.Drawing.Point(654, 30);
            this.buttonHozzaad.Name = "buttonHozzaad";
            this.buttonHozzaad.Size = new System.Drawing.Size(117, 32);
            this.buttonHozzaad.TabIndex = 6;
            this.buttonHozzaad.Text = "Hozzáad";
            this.buttonHozzaad.UseVisualStyleBackColor = true;
            this.buttonHozzaad.Click += new System.EventHandler(this.buttonHozzaad_Click);
            // 
            // listBox
            // 
            this.listBox.FormattingEnabled = true;
            this.listBox.Location = new System.Drawing.Point(16, 96);
            this.listBox.Name = "listBox";
            this.listBox.Size = new System.Drawing.Size(559, 329);
            this.listBox.TabIndex = 7;
            // 
            // warningLabel
            // 
            this.warningLabel.AutoSize = true;
            this.warningLabel.Location = new System.Drawing.Point(426, 68);
            this.warningLabel.Name = "warningLabel";
            this.warningLabel.Size = new System.Drawing.Size(0, 13);
            this.warningLabel.TabIndex = 8;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.warningLabel);
            this.Controls.Add(this.listBox);
            this.Controls.Add(this.buttonHozzaad);
            this.Controls.Add(this.textBoxEladott);
            this.Controls.Add(this.textBoxElkeszitett);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.comboBox);
            this.Controls.Add(this.label1);
            this.Name = "Form1";
            this.Text = "Angyalka";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.ComboBox comboBox;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox textBoxElkeszitett;
        private System.Windows.Forms.TextBox textBoxEladott;
        private System.Windows.Forms.Button buttonHozzaad;
        private System.Windows.Forms.ListBox listBox;
        private System.Windows.Forms.Label warningLabel;
    }
}

