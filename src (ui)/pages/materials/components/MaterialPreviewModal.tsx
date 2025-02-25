import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
  Avatar,
} from '@nextui-org/react';
import {
  Download,
  Eye,
  Star,
  FileText,
  Calendar,
  Share2,
  MessageSquare,
  Bookmark,
} from 'lucide-react';

interface MaterialPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  material: any;
  onDownload: (id: string) => void;
}

export function MaterialPreviewModal({
  isOpen,
  onClose,
  material,
  onDownload,
}: MaterialPreviewModalProps) {
  if (!material) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex gap-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-default-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-default-500" />
            </div>
            <div>
              <h3 className="text-xl">{material.title}</h3>
              <div className="flex items-center gap-2 text-small text-default-500">
                <span>{material.subject}</span>
                <span>•</span>
                <span>Grade {material.grade}</span>
              </div>
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar
                  src={material.uploadedBy.avatar}
                  name={material.uploadedBy.name}
                  size="sm"
                />
                <div>
                  <p className="font-medium">{material.uploadedBy.name}</p>
                  <div className="flex items-center gap-2 text-small text-default-500">
                    <Calendar className="w-4 h-4" />
                    <span>{material.uploadDate}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
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
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-default-500">
                {material.description}
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">File Information</h4>
              <div className="flex items-center gap-3">
                <Chip size="sm" variant="flat">
                  {material.fileType}
                </Chip>
                <span className="text-small text-default-500">
                  {material.fileSize}
                </span>
              </div>
            </div>

            <div className="aspect-video bg-default-100 rounded-lg flex items-center justify-center">
              <FileText className="w-12 h-12 text-default-300" />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex-1 flex gap-2">
            <Button
              variant="light"
              startContent={<MessageSquare className="w-4 h-4" />}
            >
              Comment
            </Button>
            <Button
              variant="light"
              startContent={<Share2 className="w-4 h-4" />}
            >
              Share
            </Button>
            <Button
              variant="light"
              startContent={<Bookmark className="w-4 h-4" />}
            >
              Bookmark
            </Button>
          </div>
          <Button variant="flat" onPress={onClose}>
            Close
          </Button>
          <Button
            color="primary"
            onPress={() => onDownload(material.id)}
            startContent={<Download className="w-4 h-4" />}
          >
            Download
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}