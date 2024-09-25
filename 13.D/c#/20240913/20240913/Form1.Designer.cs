namespace _20240913
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
            this.tbMarka = new System.Windows.Forms.TextBox();
            this.cbControl = new System.Windows.Forms.ComboBox();
            this.lbMarka = new System.Windows.Forms.Label();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.lbNev = new System.Windows.Forms.Label();
            this.lbModel = new System.Windows.Forms.Label();
            this.lbExtra = new System.Windows.Forms.Label();
            this.tbNev = new System.Windows.Forms.TextBox();
            this.tbModel = new System.Windows.Forms.TextBox();
            this.tbExtra = new System.Windows.Forms.TextBox();
            this.btnSubmit = new System.Windows.Forms.Button();
            this.btnEdit = new System.Windows.Forms.Button();
            this.groupBox1.SuspendLayout();
            this.SuspendLayout();
            // 
            // tbMarka
            // 
            this.tbMarka.Location = new System.Drawing.Point(87, 49);
            this.tbMarka.Name = "tbMarka";
            this.tbMarka.Size = new System.Drawing.Size(194, 20);
            this.tbMarka.TabIndex = 0;
            // 
            // cbControl
            // 
            this.cbControl.FormattingEnabled = true;
            this.cbControl.Location = new System.Drawing.Point(12, 21);
            this.cbControl.Name = "cbControl";
            this.cbControl.Size = new System.Drawing.Size(292, 21);
            this.cbControl.TabIndex = 1;
            // 
            // lbMarka
            // 
            this.lbMarka.AutoSize = true;
            this.lbMarka.Location = new System.Drawing.Point(42, 52);
            this.lbMarka.Name = "lbMarka";
            this.lbMarka.Size = new System.Drawing.Size(40, 13);
            this.lbMarka.TabIndex = 2;
            this.lbMarka.Text = "Márka:";
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.btnEdit);
            this.groupBox1.Controls.Add(this.tbExtra);
            this.groupBox1.Controls.Add(this.btnSubmit);
            this.groupBox1.Controls.Add(this.tbModel);
            this.groupBox1.Controls.Add(this.tbNev);
            this.groupBox1.Controls.Add(this.lbExtra);
            this.groupBox1.Controls.Add(this.lbModel);
            this.groupBox1.Controls.Add(this.lbNev);
            this.groupBox1.Controls.Add(this.lbMarka);
            this.groupBox1.Controls.Add(this.tbMarka);
            this.groupBox1.Location = new System.Drawing.Point(417, 49);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(340, 328);
            this.groupBox1.TabIndex = 3;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "groupBox1";
            // 
            // lbNev
            // 
            this.lbNev.AutoSize = true;
            this.lbNev.Location = new System.Drawing.Point(42, 99);
            this.lbNev.Name = "lbNev";
            this.lbNev.Size = new System.Drawing.Size(30, 13);
            this.lbNev.TabIndex = 3;
            this.lbNev.Text = "Név:";
            // 
            // lbModel
            // 
            this.lbModel.AutoSize = true;
            this.lbModel.Location = new System.Drawing.Point(42, 140);
            this.lbModel.Name = "lbModel";
            this.lbModel.Size = new System.Drawing.Size(41, 13);
            this.lbModel.TabIndex = 4;
            this.lbModel.Text = "Modell:";
            // 
            // lbExtra
            // 
            this.lbExtra.AutoSize = true;
            this.lbExtra.Location = new System.Drawing.Point(42, 180);
            this.lbExtra.Name = "lbExtra";
            this.lbExtra.Size = new System.Drawing.Size(34, 13);
            this.lbExtra.TabIndex = 5;
            this.lbExtra.Text = "Extra:";
            // 
            // tbNev
            // 
            this.tbNev.Location = new System.Drawing.Point(87, 96);
            this.tbNev.Name = "tbNev";
            this.tbNev.Size = new System.Drawing.Size(194, 20);
            this.tbNev.TabIndex = 6;
            // 
            // tbModel
            // 
            this.tbModel.Location = new System.Drawing.Point(87, 137);
            this.tbModel.Name = "tbModel";
            this.tbModel.Size = new System.Drawing.Size(194, 20);
            this.tbModel.TabIndex = 7;
            // 
            // tbExtra
            // 
            this.tbExtra.Location = new System.Drawing.Point(87, 177);
            this.tbExtra.Name = "tbExtra";
            this.tbExtra.Size = new System.Drawing.Size(194, 20);
            this.tbExtra.TabIndex = 8;
            // 
            // btnSubmit
            // 
            this.btnSubmit.Location = new System.Drawing.Point(141, 286);
            this.btnSubmit.Name = "btnSubmit";
            this.btnSubmit.Size = new System.Drawing.Size(75, 23);
            this.btnSubmit.TabIndex = 4;
            this.btnSubmit.Text = "Submit";
            this.btnSubmit.UseVisualStyleBackColor = true;
            // 
            // btnEdit
            // 
            this.btnEdit.Location = new System.Drawing.Point(222, 286);
            this.btnEdit.Name = "btnEdit";
            this.btnEdit.Size = new System.Drawing.Size(75, 23);
            this.btnEdit.TabIndex = 9;
            this.btnEdit.Text = "Edit";
            this.btnEdit.UseVisualStyleBackColor = true;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.cbControl);
            this.Name = "Form1";
            this.Text = "Form1";
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.TextBox tbMarka;
        private System.Windows.Forms.ComboBox cbControl;
        private System.Windows.Forms.Label lbMarka;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.TextBox tbExtra;
        private System.Windows.Forms.TextBox tbModel;
        private System.Windows.Forms.TextBox tbNev;
        private System.Windows.Forms.Label lbExtra;
        private System.Windows.Forms.Label lbModel;
        private System.Windows.Forms.Label lbNev;
        private System.Windows.Forms.Button btnSubmit;
        private System.Windows.Forms.Button btnEdit;
    }
}

