import React, { useState } from 'react';

const FileUploadAction = () => {

    let rootFolderId = '1fjNDMduWVcwD822yRAmML2JcJGJyZ0Ek';
    let numUploads = {};
    numUploads.done = 0;
    numUploads.total = 0;

    function include(filename) {
        return HtmlService.createHtmlOutputFromFile(filename)
            .getContent();
      }

      function createFolder(parentFolderId, folderName) {
          try {
              var parentFolder = DriveApp.getFolderById(parentFolderId);
              var folders = parentFolder.getFoldersByName(folderName);
              var folder;
              if (folders.hasNext()) {
                  folder = folders.next();
              } else {
                  folder = parentFolder.createFolder(folderName);
              }
              return {
                  'folderId' : folder.getId()
              }
          } catch (e) {
              return {
                  'error' : e.toString()
              }
          }
      }
      
      function uploadFile(base64Data, fileName, folderId) {
          try {
              var splitBase = base64Data.split(','), type = splitBase[0].split(';')[0]
                      .replace('data:', '');
              var byteCharacters = Utilities.base64Decode(splitBase[1]);
              var ss = Utilities.newBlob(byteCharacters, type);
              ss.setName(fileName);
      
              var folder = DriveApp.getFolderById(folderId);
              var files = folder.getFilesByName(fileName);
              var file;
              while (files.hasNext()) {
                  // delete existing files with the same name.
                  file = files.next();
                  folder.removeFile(file);
              }
              file = folder.createFile(ss);
              return {
                  'folderId' : folderId,
                  'fileName' : file.getName()
              };
          } catch (e) {
              return {
                  'error' : e.toString()
              };
          }
      }

      const uploadFiles = () => {
        // var  folderName =document.getElementById('CustomerName').value;
        //    var allFiles = document.getElementById('filesToUpload').files;
             
        var  folderName = "sid"
           var allFiles = document.getElementById('filesToUpload').files;
           console.log(allFiles)
           
           if (allFiles.length == 0) {
               window.alert('No file selected!');
           } else {
               numUploads.total = allFiles.length;
               createFolder_withSuccessHandler(createFolder(rootFolderId, folderName));
           }
       }

       function createFolder_withSuccessHandler(data){
            console.log(data)
           var allFiles = document.getElementById('filesToUpload').files;
           for (var i = 0; i < allFiles.length; i++) {						
                       uploadFilez(allFiles[i], data.folderId);
                   }
       }

       function uploadFilez(file, folderId) {
           var reader = new FileReader();
            var content = reader.result;
           
        //    reader.onload = function(e) {
        //        var content = reader.result;
        //        document.getElementById('output').innerHTML = 'uploading '
        //                + file.name + '...';					
        //     //    google.script.run.withSuccessHandler(onFileUploaded)

            uploadFile(content, file.name, folderId);
        //    }
        //    reader.readAsDataURL(file);
       }

    //    function onFileUploaded(r) {
    //        numUploads.done++;
    //        document.getElementById('output').innerHTML = 'uploaded '
    //                + r.fileName + ' (' + numUploads.done + '/'
    //                + numUploads.total + ' files).';
    //        if (numUploads.done == numUploads.total) {
    //            document.getElementById('output').innerHTML = 'All of the '
    //                    + numUploads.total + ' files are uploaded';
    //            numUploads.done = 0;
    //        }
    //    }	



return (
    <div className="ImageForm">
        <h1>F</h1>
        <form>
        <label for="CustomerName">Customer Name:</label>
        <input type="text" id="CustomerName" name="Customer Name" required></input>
        <br/>
        <label for="AlbumTitle">Album Title:</label>
        <input type="text" id="AlbumTitle" name="Album Title"></input>
        <br/>
        <label for="SalesOrderNumber">Sales Order Number:</label>
        <input type="text" id="SalesOrderNumber" name="SalesOrderNumber"></input>
        <br/>
        <input type="file" name="filesToUpload" id="filesToUpload" multiple></input>
        <input type="submit" value="Submit" onClick={uploadFiles}></input>
        </form>
    

    </div>
);

}

export default FileUploadAction;