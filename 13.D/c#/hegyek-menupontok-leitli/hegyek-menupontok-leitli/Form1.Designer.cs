namespace hegyek_menupontok_leitli
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
            this.menuStrip1 = new System.Windows.Forms.MenuStrip();
            this.feladatToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.feladatToolStripMenuItem1 = new System.Windows.Forms.ToolStripMenuItem();
            this.kilépésToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.feladatSzámolásToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.menuStrip1.SuspendLayout();
            this.SuspendLayout();
            // 
            // menuStrip1
            // 
            this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.feladatToolStripMenuItem,
            this.kilépésToolStripMenuItem});
            this.menuStrip1.Location = new System.Drawing.Point(0, 0);
            this.menuStrip1.Name = "menuStrip1";
            this.menuStrip1.Size = new System.Drawing.Size(800, 24);
            this.menuStrip1.TabIndex = 0;
            this.menuStrip1.Text = "menuStrip1";
            // 
            // feladatToolStripMenuItem
            // 
            this.feladatToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.feladatToolStripMenuItem1,
            this.feladatSzámolásToolStripMenuItem});
            this.feladatToolStripMenuItem.Name = "feladatToolStripMenuItem";
            this.feladatToolStripMenuItem.Size = new System.Drawing.Size(70, 20);
            this.feladatToolStripMenuItem.Text = "Feladatok";
            // 
            // feladatToolStripMenuItem1
            // 
            this.feladatToolStripMenuItem1.Name = "feladatToolStripMenuItem1";
            this.feladatToolStripMenuItem1.Size = new System.Drawing.Size(184, 22);
            this.feladatToolStripMenuItem1.Text = "2. feladat - Beolvasás";
            this.feladatToolStripMenuItem1.Click += new System.EventHandler(this.feladatToolStripMenuItem1_Click);
            // 
            // kilépésToolStripMenuItem
            // 
            this.kilépésToolStripMenuItem.Name = "kilépésToolStripMenuItem";
            this.kilépésToolStripMenuItem.Size = new System.Drawing.Size(56, 20);
            this.kilépésToolStripMenuItem.Text = "Kilépés";
            // 
            // feladatSzámolásToolStripMenuItem
            // 
            this.feladatSzámolásToolStripMenuItem.Name = "feladatSzámolásToolStripMenuItem";
            this.feladatSzámolásToolStripMenuItem.Size = new System.Drawing.Size(184, 22);
            this.feladatSzámolásToolStripMenuItem.Text = "3. feladat - Számolás";
            this.feladatSzámolásToolStripMenuItem.Click += new System.EventHandler(this.feladatSzámolásToolStripMenuItem_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.menuStrip1);
            this.MainMenuStrip = this.menuStrip1;
            this.Name = "Form1";
            this.Text = "Form1";
            this.menuStrip1.ResumeLayout(false);
            this.menuStrip1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.MenuStrip menuStrip1;
        private System.Windows.Forms.ToolStripMenuItem feladatToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem kilépésToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem feladatToolStripMenuItem1;
        private System.Windows.Forms.ToolStripMenuItem feladatSzámolásToolStripMenuItem;
    }
}

