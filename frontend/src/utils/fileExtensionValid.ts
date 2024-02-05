export const ALLOW_FILE_EXTENTION = 'mp4,mov,wmv,avi,avchd,webm';

// 파일 확장자 검사
const fileExtensionValid = ({ name }: { name: string }): boolean => {
    const extension = removeFileNmae(name);

    if (!(ALLOW_FILE_EXTENTION.indexOf(extension) > -1) || extension === '') {
        return false;
    }
    return true;
};

// 확장자만 리턴해주는 함수
const removeFileNmae = (originalFileName: string): string => {
    const lastIndex = originalFileName.lastIndexOf('.');
    if (lastIndex < 0) return '';
    return originalFileName.substring(lastIndex + 1).toLowerCase();
};

export default fileExtensionValid;
