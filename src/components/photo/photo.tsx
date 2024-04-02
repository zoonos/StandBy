import React from 'react';
import styles from './photo.module.css';

function Photo() {
    const [imgFile, setImgFile] = React.useState('');

    // 이미지 업로드 input의 onChange
    const saveImgFile = (e: React.ChangeEvent) => {
        const targetFiles = (e.target as HTMLInputElement).files as FileList;
        console.log(URL.createObjectURL(targetFiles[0]));
        setImgFile(URL.createObjectURL(targetFiles[0]));
    };

    // 취소나면
    return (
        <div className="itemWrap">
            <div className={styles.photoWrap}>
                <label htmlFor="image">
                    {imgFile ? <img src={imgFile} /> : '이미지를 선택하세요.'}
                </label>

                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={saveImgFile}
                />
            </div>
        </div>
    );
}
export default Photo;
