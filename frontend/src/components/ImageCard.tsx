import { useState } from "react";
import {
  Copy,
  Download,
  Trash2,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ImageCardProps = {
  imageUrl: string;
  title: string;
  description?: string;
  onDelete: () => void;
  onDownload: () => void;
};

export const ImageCard = ({
  imageUrl,
  title,
  description,
  onDelete,
  onDownload,
}: ImageCardProps) => {
  const [copied, setCopied] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(imageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <Card className="w-full max-w-sm overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg">
      <CardContent className="p-0">
        <div className="group relative">
          <img
            src={imageUrl}
            alt={title}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyLink}
                    className="text-white transition-colors hover:text-blue-400"
                  >
                    {copied ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{copied ? "Copied!" : "Copy link"}</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onDelete}
                    className="text-white transition-colors hover:text-red-400"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete image</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onDownload}
                    className="text-white transition-colors hover:text-green-400"
                  >
                    <a href={imageUrl} download>
                      <Download className="h-5 w-5" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download image</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {title}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDescription}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {showDescription ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
          {showDescription && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
