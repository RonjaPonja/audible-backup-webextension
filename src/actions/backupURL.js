export const SET_BACKUP_URL = 'SET_BACKUP_URL';

export function setBackupURL(backupURL) {
  return {
    type: SET_BACKUP_URL,
    backupURL,
  };
}
