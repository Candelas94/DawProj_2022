using Guitarras.Repository;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Guitarras
{
    public partial class _Default : Page {
        protected System.Web.UI.WebControls.Button btnUpload;
        protected System.Web.UI.WebControls.Label lblUploadResult;
        protected System.Web.UI.WebControls.Panel frmConfirmation;
        protected System.Web.UI.HtmlControls.HtmlInputFile oFile;

        protected void Page_Load(object sender, EventArgs e) {

            //Usuario user = new Usuario();
            //var res = user.BuscarClaim("rol");

            var authenticationManager = HttpContext.Current.GetOwinContext().Authentication;
            var currentUser = authenticationManager.User;
            var res = currentUser.Claims.Where(x => x.Type == "rol");

            if(!IsPostBack && ((res.Any() && !(res.First().Value == "1")) || !User.Identity.IsAuthenticated  ))
            {                          
                authenticationManager.SignOut();
                Response.Redirect("~/Login.aspx");
            }

        }

        override protected void OnInit(EventArgs e) {
            // CODEGEN: This call is required by the ASP.NET Web Form Designer.
            InitializeComponent();
            base.OnInit(e);
        }
        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent() {
            //this.btnUpload.Click += new System.EventHandler(this.btnUpload_Click);
            //this.Load += new System.EventHandler(this.Page_Load);
        }


        private void btnUpload_Click(object sender, System.EventArgs e) {
            string strFileName;
            string strFilePath;
            string strFolder;

            strFolder = Server.MapPath("./img");
            // Get the name of the file that is posted.
            strFileName = this.oFile.PostedFile.FileName;
            strFileName = Path.GetFileName(strFileName);
            if(oFile.PostedFile.FileName != "")
            {
                // Create the directory if it does not exist.
                if(!Directory.Exists(strFolder))
                {
                    Directory.CreateDirectory(strFolder);
                }
                // Save the uploaded file to the server.
                strFilePath = strFolder + "\\" + strFileName;
                if(File.Exists(strFilePath))
                {
                    lblUploadResult.Text = strFileName + " already exists on the server!";
                }

                else
                {
                    oFile.PostedFile.SaveAs(strFilePath);
                    lblUploadResult.Text = strFileName + " has been successfully uploaded.";
                }
            }
            else
            {
                lblUploadResult.Text = "Click 'Browse' to select the file to upload.";
            }
            // Display the result of the upload.
            frmConfirmation.Visible = true;

        }

        protected void SignOut(object sender, EventArgs e) {
            var authenticationManager = HttpContext.Current.GetOwinContext().Authentication;
            authenticationManager.SignOut();
            Response.Redirect("~/Login.aspx");
        }

    }
}