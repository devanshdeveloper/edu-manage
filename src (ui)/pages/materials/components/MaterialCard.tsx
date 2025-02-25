import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Chip,
  Avatar,
  Progress,
  Tooltip,
} from '@nextui-org/react';
import {
  Download,
  Eye,
  Star,
  FileText,
  MoreVertical,
  Bookmark,
  Share2,
  MessageSquare,
} from 'lucide-react';

interface MaterialCardProps {
  material: {
    id: string;
    title: string;
    description: string;
    subject: string;
    grade: string;
    uploadedBy: {
      name: string;
      avatar: string;
    };
    uploadDate: string;
    downloads: number;
    views: number;
    rating: number;
    fileType: string;
    fileSize: string;
    progress?: number;
    isBookmarked?: boolean;
  };
  onView: (id: string) => void;
  onDownload: (id: string) => void;
  onBookmark?: (id: string) => void;
  showProgress?: boolean;
}

export function MaterialCard({
  material,
  onView,
  onDownload,
  onBookmark,
  showProgress = false,
}: MaterialCardProps) {
  return (
    <Card className="w-full">
      <CardBody className="gap-3">
        <div className="flex justify-between gap-3">
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-lg bg-default-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-default-500" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold text-foreground">
                {material.title}
              </h3>
              <div className="flex items-center gap-2 text-small text-default-500">
                <span>{material.subject}</span>
                <span>•</span>
                <span>Grade {material.grade}</span>
              </div>
            </div>
          </div>
          <Button
            isIconOnly
            variant="light"
            className="text-default-500"
          >
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>

        <p className="text-small text-default-500">
          {material.description}
        </p>

        {showProgress && (
          <div className="space-y-2">
            <div className="flex justify-between text-small">
              <span>Progress</span>
              <span className="text-default-500">{material.progress}%</span>
            </div>
            <Progress
              value={material.progress}
              color="primary"
              size="sm"
              radius="sm"
            />
          </div>
        )}

        <div className="flex items-center gap-3 text-small text-default-500">
          <div className="flex items-center gap-1">
            <Download className="w-4 h-4" />
            <span>{material.downloads}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{material.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-warning text-warning" />
            <span>{material.rating.toFixed(1)}</span>
          </div>
          <Chip size="sm" variant="flat">
            {material.fileType}
          </Chip>
          <span>{material.fileSize}</span>
        </div>
      </CardBody>

      <CardFooter className="gap-3">
        <div className="flex items-center gap-2 flex-1">
          <Avatar
            src={material.uploadedBy.avatar}
            size="sm"
            name={material.uploadedBy.name}
          />
          <div className="flex flex-col">
            <span className="text-small">{material.uploadedBy.name}</span>
            <span className="text-tiny text-default-500">
              {material.uploadDate}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Tooltip content="Comment">
            <Button
              isIconOnly
              variant="light"
              size="sm"
            >
              <MessageSquare className="w-4 h-4" />
            </Button>
          </Tooltip>
          <Tooltip content="Share">
            <Button
              isIconOnly
              variant="light"
              size="sm"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </Tooltip>
          {onBookmark && (
            <Tooltip content={material.isBookmarked ? "Bookmarked" : "Bookmark"}>
              <Button
                isIconOnly
                variant="light"
                size="sm"
                className={material.isBookmarked ? "text-primary" : ""}
                onPress={() => onBookmark(material.id)}
              >
                <Bookmark
                  className={`w-4 h-4 ${material.isBookmarked ? "fill-current" : ""}`}
                />
              </Button>
            </Tooltip>
          )}
          <Tooltip content="View">
            <Button
              isIconOnly
              variant="flat"
              size="sm"
              onPress={() => onView(material.id)}
            >
              <Eye className="w-4 h-4" />
            </Button>
          </Tooltip>
          <Tooltip content="Download">
            <Button
              isIconOnly
              variant="solid"
              color="primary"
              size="sm"
              onPress={() => onDownload(material.id)}
            >
              <Download className="w-4 h-4" />
            </Button>
          </Tooltip>
        </div>
      </CardFooter>
    </Card>
  );
}