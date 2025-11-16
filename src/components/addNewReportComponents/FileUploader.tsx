import { useState } from "react";
import { Upload, Image, FileText, Video, Music, X } from "lucide-react";

interface FileUploaderProps {
  addFileName: string;
  onFilesChange?: (files: UploadedFile[]) => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  progress: number;
  file: File;
}

export default function FileUploader({ addFileName, onFilesChange }: FileUploaderProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files).map((file: File) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1) + "MB",
      type: file.type,
      progress: 100,
      file,
    }));
    const newFiles = [...files, ...selectedFiles];
    setFiles(newFiles);
    onFilesChange?.(newFiles);
  };

  const handleRemove = (id: string) => {
    const newFiles = files.filter((f) => f.id !== id);
    setFiles(newFiles);
    onFilesChange?.(newFiles);
  };

  const getIcon = (type: string) => {
    if (type.startsWith("image/")) return <Image className="text-blue-500" />;
    if (type.startsWith("video/")) return <Video className="text-purple-500" />;
    if (type.startsWith("audio/")) return <Music className="text-orange-500" />;
    return <FileText className="text-gray-500" />;
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-700">{addFileName}</h3>
        <label className="cursor-pointer flex items-center gap-2 text-sm font-medium text-gray-600 bg-white py-2 px-6 rounded-lg">
          <Upload size={18} className="text-blue-500"/>
          Add Attachment
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <div className="flex flex-col gap-3">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg"
          >
            <div className="flex items-center gap-3">
              {getIcon(file.type)}
              <div className="flex gap-4">
                <span className="text-sm font-medium text-gray-800">
                  {file.name}
                </span>
                <a
                  href={URL.createObjectURL(file.file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-xs"
                >
                  Preview
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">{file.size}</span>
              {file.progress < 100 ? (
                <div className="w-16 bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full"
                    style={{ width: `${file.progress}%` }}
                  />
                </div>
              ) : null}
              <button onClick={() => handleRemove(file.id)}>
                <X size={16} className="text-gray-400 hover:text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
