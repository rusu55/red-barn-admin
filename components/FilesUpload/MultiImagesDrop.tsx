import { Button } from "@/components/ui/button";
import {
  MultiImageDropzone,
  type FileState,
} from "@/components/FilesUpload/MultiImages";

const MultiImagesDrop = ({fileStates, setFileStates, edgestore, images, setImages}: any) => {

  // -------------------- FUNCTION FOR UPLOAD --------------- //
  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates: any) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState: any) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  return (
    <div>
    <MultiImageDropzone
      value={fileStates}
      dropzoneOptions={{
        maxFiles: 150,
        maxSize: 1920 * 1024 * 2, // 1 MB
      }}
      onChange={setFileStates}
      onFilesAdded={async (addedFiles) => {
        setFileStates([...fileStates, ...addedFiles]);
      }}
    />

    <Button
      className="mt-2"
      onClick={async () => {
        await Promise.all(
          fileStates.map(async (fileState: any) => {
            try {
              if (
                fileState.progress !== "PENDING" ||
                typeof fileState.file === "string"
              ) {
                return;
              }
              const res = await edgestore.publicFiles.upload({
                file: fileState.file,
                onProgressChange: async (progress: any) => {
                  updateFileProgress(fileState.key, progress);
                  if (progress === 100) {
                    // wait 1 second to set it to complete
                    // so that the user can see the progress bar
                    await new Promise((resolve) =>
                      setTimeout(resolve, 1000)
                    );
                    updateFileProgress(fileState.key, "COMPLETE");
                  }
                },
              });
              setImages((uploadRes: any) => [...uploadRes, res.url]);
            } catch (err) {
              updateFileProgress(fileState.key, "ERROR");
            }
          })
        );
      }}
      disabled={
        !fileStates.filter((fileState: any) => fileState.progress === "PENDING")
          .length
      }
    >
      Upload
    </Button>
  </div>
  )
}

export default MultiImagesDrop