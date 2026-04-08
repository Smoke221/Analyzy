/**
 * Access rules: authenticated files → JWT user must own the file.
 * Guest files → client IP must match stored requestIP (when present).
 */
function canAccessFile(file, req) {
  if (!file || !req) return false;
  const ip = req.clientIp;

  if (file.isAuthenticated && file.owner) {
    if (!req.userID) return false;
    return String(file.owner) === String(req.userID);
  }

  if (!file.isAuthenticated) {
    if (!file.requestIP) {
      return true;
    }
    return Boolean(ip && file.requestIP === ip);
  }

  return false;
}

function toPublicFile(file) {
  if (!file) return null;
  return {
    _id: file._id,
    fileName: file.fileName,
    fileURL: file.fileURL,
    uploadDate: file.uploadDate,
    isAuthenticated: file.isAuthenticated,
  };
}

module.exports = { canAccessFile, toPublicFile };
