import { faPlusCircle, faUpload } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Tabs } from 'antd';
import { QuizService } from 'api/QuizService';
import { KCSModal, Notification } from 'components/common';
import QuizDetail from 'components/page/quiz/QuizDetail';
import QuizItem from 'components/page/quiz/QuizItem';
import { TITLE_ANS, TYPE_QUIZ } from 'constants/constants';
import { ROUTES } from 'global/routes';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as XLSX from "xlsx";

const ANS_VI = ['Đáp án 1', 'Đáp án 2', 'Đáp án 3', 'Đáp án 4', 'Đáp án 5', 'Đáp án 6'];

const NewQuiz = () => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [cateList, setCateList] = useState([]);
  const [quizUpload, setQuizUpload] = useState([]);
  const history = useHistory();
  const [form] = Form.useForm();
  const fileInputRef = useRef();

  const { data: cates } = QuizService.useGetCategory({ params: {} });

  useEffect(() => {
    if (cates?.length) {
      const arr = cates.map(item => ({ value: item.cateId, text: item.cateName }));
      setCateList(arr);
    }
  }, [cates])

  const handleSubmit = (values) => {
    const data = values.data;
    data.forEach(item => {
      item.type = item.correctAnswer.length > 1 ? TYPE_QUIZ.MULTI : TYPE_QUIZ.SINGLE;
    });
    callApiCreate(data);
  };

  const callApiCreate = (data) => {
    QuizService.createQuiz(data, res => {
      if (res) {
        Notification.success('Thêm câu hỏi thành công!');
        history.push(ROUTES.QUIZ_MANAGEMENT);
      } else {
        Notification.error(res.message);
      }
    })
  }

  const handleBack = () => {
    setOpenConfirmModal(false);
    history.push(ROUTES.QUIZ_MANAGEMENT);
  }

  const onCancel = () => {
    setOpenConfirmModal(true);
  }

  const submitUpload = () => {
    if (!quizUpload.length) return;
    callApiCreate(quizUpload);
  }

  const readExcel = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      let data = XLSX.utils.sheet_to_json(ws);
      try {
        data = convertDataExel(data);
        setQuizUpload(data);
      } catch (err) {
        console.log(err);
        Notification.error('File upload không hợp lệ!');
      }
    };

    fileReader.onerror = (error) => {
      console.log('error', error);
      Notification.error('Không thể upload file!');
    };
  };

  const convertDataExel = (data) => {
    let quizs = [];
    data.forEach(item => {
      const correctAnswer = getCorrectAnswer(item);
      const quiz = {
        cateName: item['Danh mục'] || 'general',
        question: item['Nội dung'],
        answer: getAnswer(item),
        correctAnswer,
        type: correctAnswer.length > 1 ? "MULTI" : 'SINGLE',
      }
      quizs.push(quiz);
    });
    return quizs;
  }

  const getAnswer = (data) => {
    let arr = [];
    ANS_VI.forEach(txt => {
      if (data[txt]) {
        arr.push({ label: data[txt] });
      }
    });
    return arr;
  }

  const getCorrectAnswer = (data) => {
    let arr = [];
    let ans = data['Trả lời đúng'].toString();
    if (!ans) {
      Notification.error(`Phần trả lời đúng của câu số ${data['STT']} còn thiếu!`);
      return [];
    }
    ans = ans.split(',').map(item => (Number(item.trim())));
    ans.forEach(item => {
      if (item) {
        arr.push(TITLE_ANS[item - 1]);
      }
    });
    return arr;
  }

  const fileUploadInputChange = (e) => {
    const file = e.target.files[0];
    readExcel(file);
    e.target.value = '';
  }

  const clickUpload = () => {
    fileInputRef.current.click();
  }

  const clearData = () => {
    setQuizUpload([]);
  }

  const manuallyTab = () => (
    <Form name="basic" className="mt-4" onFinish={handleSubmit} form={form}>
      <div className='flex justify-end space-x-6'>
        <Button type="link" className='bg-gray-200 text-black py-4 px-8 rounded-sm' onClick={onCancel}>Cancel</Button>
        <Button type="primary" htmlType='submit' className='bg-green-500 py-4 px-8 rounded-sm'>Submit</Button>
      </div>

      <div className='w-2/3 p-4 bg-gray-50 rounded-lg text-base'>
        <p className='medium uppercase mb-5'>Danh sách câu hỏi</p>

        <Form.List name="data" initialValue={[
          { question: "Câu hỏi 1" },
        ]}>
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <div key={field.key} className='mb-4'>
                    <QuizItem
                      index={index}
                      fields={fields}
                      form={form}
                      typeList={cateList}
                      onDelete={() => remove(field.name)}
                    />
                  </div>
                ))}

                <Form.Item>
                  <Button className='mt-5 text-blue-500 medium text-base'
                    onClick={() => add({ question: `Câu hỏi ${fields.length + 1}` })}>
                    <FontAwesomeIcon icon={faPlusCircle} color="#1890ff" className='mr-2' />
                    <span>Thêm câu hỏi</span>
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      </div>
    </Form>
  )

  const uploadFileTab = () => (
    <div>
      <div className='flex justify-end space-x-6'>
        <Button type="link" className='bg-gray-200 text-black py-4 px-8 rounded-sm' onClick={onCancel}>Cancel</Button>
        <Button type="primary" className='bg-green-500 py-4 px-8 rounded-sm' onClick={submitUpload}>Submit</Button>
      </div>

      <div className='my-6 flex-center space-x-4'>
        <div>
          <Button type="primary" className='bg-gray-50 py-4 text-blue-400 rounded-sm' onClick={clickUpload}>
            <FontAwesomeIcon icon={faUpload} className='text-blue-400 mr-2' />
            <span>Upload files Exel</span>
          </Button>
          <input onChange={fileUploadInputChange} multiple={false} ref={fileInputRef} type='file' accept=".xlsx, .xls, .csv" hidden />
        </div>
        <a download={true} href="/example.xlsx">
          <Button type="primary" className='text-white py-4 bg-prime-blue rounded-sm'>
            <span>Download Template</span>
          </Button>
        </a>
        <Button type="primary" className='text-white py-4 bg-red-500 border-red-500 rounded-sm' onClick={clearData}>
          <span>Clear</span>
        </Button>
      </div>

      {quizUpload.length ?
        <div className='w-2/3 p-4 bg-gray-50 rounded-lg text-base'>
          <p className='medium uppercase mb-5'>Danh sách câu hỏi</p>
          {quizUpload.map((item, index) => (
            <QuizDetail key={index} data={item} index={index + 1} />
          ))}
        </div> : null
      }
    </div>
  )

  return (
    <div>
      <h1 className='text-xl medium text-prime-blue mb-5 mr-2'>Thêm Quiz</h1>
      <Tabs
        items={[
          {
            key: '1',
            label: <span className='text-base'>Thêm thủ công</span>,
            children: manuallyTab(),
          },
          {
            key: '2',
            label: <span className='text-base'>Upload file</span>,
            children: uploadFileTab(),
          },
        ]}
      />

      <KCSModal
        isOpenModal={openConfirmModal}
        closeModal={() => setOpenConfirmModal(false)}
        closeButton='Bỏ qua'
        confirmButton='Chấp nhận'
        content='Nội dung đã thay đổi sẽ không được lưu. Bạn có chắc chắn muốn kết thúc hoạt động này?'
        confirmAction={handleBack}
      />
    </div>
  );
}

export default React.memo(NewQuiz);
