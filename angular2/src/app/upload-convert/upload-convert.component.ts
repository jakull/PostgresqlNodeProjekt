import { Component, ElementRef, ViewChild, EventEmitter, Output, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
//import { ConverterServiceProxy } from '@shared/service-proxies/service-proxies';



/**
 * Basic component to provide file drag & drop (and click) functionality
 * for uploading files using HTML file API.
 * https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
 *
 * Note if looking at the debug console in FF and find the drop dataTransfer
 * value to be null - that's only a debug display issue with FF.
 * https://stackoverflow.com/a/60305243/1585218
 */
@Component({
  selector: 'app-upload-convert',
  templateUrl: './upload-convert.component.html',
  styleUrls: ['./upload-convert.component.scss'],
})
export class UploadConvertComponent{

  private _isDragging: boolean;
  public uploadedFiles: { file: File, converted: boolean, content: string, loading: boolean, format: string, show: boolean}[] = [];
  public convertedFiles: File[] = [];
  public content: string  ="ghsfghs";
  public processedContent: string = ""; 



  constructor(  private elementRef: ElementRef, private dataService: DataService) { //private converterproxy: ConverterServiceProxy,
  }

  @ViewChild('fileSelector') public fileSelector: ElementRef;
  @Output() public selectedFiles = new EventEmitter<File[]>();

  public get isDragging(): boolean { return this._isDragging; }

  public onDrop(event: any): void {
    
    event.preventDefault();
    this._isDragging = false;

    const result = [];
    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (const item of event.dataTransfer.items) {
        if (item.kind !== 'file') {
          return;
        }
        /*let srtContent
        const dropReader = new FileReader();
  
        dropReader.onload = function(event) {
          srtContent = event.target.result; // Der Inhalt der Datei
          console.log("srtContent",srtContent)

        };
        console.log("IIIIIIITEM:", item);
        dropReader.readAsText(item.getAsFile());
        
          

        result.push(item.getAsFile());
        console.log("Item: ",item);
        let newfile = item.getAsFile();
        console.log("Newfile:",newfile);
        if(newfile.name.endsWith('.vtt') ){
        this.uploadedFiles.push({ file: newfile, converted: false, content: srtContent, loading: false, format: "VTT-Format", show: false });
        } else {
          console.log("kein vtt file");
        }*/

          this.readFileAsync(item.getAsFile()).then(fileContent => {
            let newfile = item.getAsFile();
            if (newfile.name.endsWith('.vtt')) {
              this.uploadedFiles.push({
                file: newfile,
                converted: false,
                content: fileContent, 
                loading: false,
                format: "VTT-Format",
                show: false
              });
            } else {
              console.log("Kein VTT-Datei");
            }
          }).catch(error => {
            console.error("Fehler beim Lesen der Datei:", error);
          });
        




      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (const file of event.dataTransfer.files) {
        result.push(file);
        console.log("File: ",file);
        this.uploadedFiles.push(file.getAsFile());
      }
    }
    console.log("Result",result);


        console.log("Antwort:", this.processedContent);
        console.log ("Uploaded file:",this.uploadedFiles);

    this.emitFiles(result);
  }

  public onFilesSelected(files: any[]): void {
    if (files == undefined || files.length === 0) {
      return;
    }

    
    for (const file of files) {
      console.log("FILLLLLLE",file);
      
      this.readFileAsync(file).then(fileContent => {
        let newfile = file;
        if (newfile.name.endsWith('.vtt')) {
          this.uploadedFiles.push({
            file: newfile,
            converted: false,
            content: fileContent, 
            loading: false,
            format: "VTT-Format",
            show: false
          });
        } else {
          console.log("Kein VTT-Datei");
        }
      }).catch(error => {
        console.error("Fehler beim Lesen der Datei:", error);
      });
    }
    
    this.fileSelector.nativeElement.value = ''; // required to trigger (change) if user immediately uploads same named file 
  }

  public onDragOver(event: any): void {
    // Stop browser opening the file
    event.preventDefault();
    this._isDragging = true;
  }

  public stopDrag(event: any): void {
    this._isDragging = false;
    event.preventDefault();
    event.stopPropagation();
  }

  private emitFiles(files: File[]): void {
    this.selectedFiles.emit(files);
  }


  private readFileAsync(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const fileContent = event.target.result as string; 
        resolve(fileContent);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsText(file);
    });
  }



/*
  readFileContent(file: File) {
    let reader = new FileReader();

    reader.onload = (event: any) => {
      // Den Dateiinhalt in einer Variablen speichern
      let fileContent = event.target.result as string;
      // Eintrag im Array aktualisieren oder hinzufügen
      let existingFileIndex = this.uploadedFiles.findIndex(item => item.file.name === file.name);
      if (existingFileIndex !== -1) {
        // Datei existiert bereits im Array, Inhalt aktualisieren
        this.uploadedFiles[existingFileIndex].content = fileContent;
      } else {
        // Neue Datei hinzufügen
        this.uploadedFiles.push({ file: file, converted: false, content: fileContent });
      }
    };} */



  public download(dlFile) {
    
    if (dlFile.file.name.endsWith('.vtt')) {
        
        let newFileName = dlFile.file.name.replace('.vtt', '.srt');
        let newContent = dlFile.content;

        
        let file = new Blob([newContent], { type: 'text/plain' });

        
        let a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = newFileName;
        document.body.appendChild(a);
        a.click();

        
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    } else {
        
        console.log("Die Datei hat nicht die Erweiterung .vtt. Download abgebrochen.");
    }
}

public async convert(cFile) {
  cFile.loading = true;
  console.log("CFILE:", cFile);
  let fileContent

  const creader = new FileReader();
  
  creader.onload = function(event) {
    fileContent = event.target.result; 
    console.log("MMMMMMMMMMMMM",fileContent); 
  };
  console.log("IIIIIIITEM:", cFile);
  creader.readAsText(cFile.file);




  await this.sleep(5000); 
  console.log("CONTENT:", fileContent );
  this.dataService.convertVttToSrt(fileContent).subscribe(
    (response: any) => {
      console.log("responsex:",response);
      cFile.content  = response.srt;
      cFile.loading = false;
      cFile.converted = true;
      cFile.format = "SRT-Format";
      console.log("DATAAAAx", this.processedContent);
    },
    (error: any) => {
      console.error('There was an error!', error);
    }
  );
  /*this.converterproxy.onPostStartOrderStt(fileContent).subscribe(response => {
    cFile.content = response;
    cFile.loading = false;
    cFile.converted = true;
    cFile.format = "SRT-Format";
  });  */
  
}
  
public sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

public show (sFile){
  sFile.show = !sFile.show;
}

public openModal(mFile) {
  var content = mFile.content;
  document.getElementById("modal-content").innerText = content;
  
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
}

public closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

@HostListener('window:click', ['$event'])
onClick(event: Event): void {
  const modal = this.elementRef.nativeElement.querySelector('#myModal');
  if (event.target === modal) {
    this.closeModal();
  }
}

}

