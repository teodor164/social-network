const ADD_MESSAGE = 'ADD-MESSAGE'

let initialState = {
  messagesData: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'How are you?' },
    { id: 3, message: '42' },
  ],
  dialogsData: [
    {
      id: 1,
      name: 'Dima',
      img: 'https://meragor.com/files/styles//ava_800_800_wm/standoff_162.jpg',
    },
    {
      id: 2,
      name: 'Andrey',
      img: 'https://avatars.mds.yandex.net/get-zen_doc/3512693/pub_5efb3ff066fe1d5006536937_5efb4be4cdd4d637ce0fd2e8/scale_1200',
    },
    {
      id: 3,
      name: 'Maxim',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn8H3mqnU943_lgdPtj-JIGRjyKAlp3FSLzg&usqp=CAU',
    },
    {
      id: 4,
      name: 'Ghena',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx5wghphVB-NTZeDHzsjPFUGY2_V-yPNnq1g&usqp=CAU',
    },
    {
      id: 5,
      name: 'Renat',
      img: 'http://pristor.ru/wp-content/uploads/2019/01/%D0%A8%D0%B8%D0%BA%D0%B0%D1%80%D0%BD%D1%8B%D0%B5-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D0%BA%D0%B8-%D0%B4%D0%BB%D1%8F-%D0%92%D0%9A%D0%BE%D0%BD%D1%82%D0%B0%D0%BA%D1%82%D0%B5-%D0%B4%D0%B5%D0%B2%D1%83%D1%88%D0%BA%D0%B0%D0%BC-%D0%B8-%D0%B4%D0%B5%D0%B2%D0%BE%D1%87%D0%BA%D0%B0%D0%BC-%D0%BF%D0%BE%D0%B4%D0%B1%D0%BE%D1%80%D0%BA%D0%B0-4.jpg',
    },
    {
      id: 6,
      name: 'Sasha',
      img: 'https://cs-love.net/avatars/images/cs-love-avatar-0.jpg',
    },
    {
      id: 7,
      name: 'Victor',
      img: 'https://sovietgames.su/wp-content/uploads/2016/07/%D0%90%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D0%BA%D0%B0.jpg',
    },
  ],
}

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messagesData: [
          ...state.messagesData,
          {
            id: 1,
            message: action.newMessageBoddy,
          },
        ],
      }

    default:
      return state
  }
}

export const addMessge = (newMessageBoddy) => ({
  type: ADD_MESSAGE,
  newMessageBoddy,
})

export default dialogsReducer
