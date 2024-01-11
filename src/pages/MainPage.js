import { Layout } from 'antd';
import { ProgressTurn } from 'components/common';
import Header from 'components/page/mainpage/Header';
import Sidebar from 'components/page/mainpage/Sidebar';
import { ROUTES } from 'global/routes';
import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

const { Content, Footer } = Layout;
const Home = lazy(() => import('pages/home/Home'));
const Quiz = lazy(() => import('pages/quiz/Quiz'));
const QuizType = lazy(() => import('pages/quiz/QuizType'));
const NewQuiz = lazy(() => import('pages/quiz/NewQuiz'));

const Article = lazy(() => import('pages/article/Article'));
const Category = lazy(() => import('pages/article/Category'));
const NewArticle = lazy(() => import('pages/article/NewArticle'));

const StatisticalNews = lazy(() => import('pages/statistical/StatisticalNews'));
const StatisticalQuiz = lazy(() => import('pages/statistical/StatisticalQuiz'));

const Account = lazy(() => import('pages/account/Account'));
const Profile = lazy(() => import('pages/profile/Profile'));
const Version = lazy(() => import('pages/util/Version'));
const NotFoundPage = lazy(() => import('pages/util/NotFoundPage'));

const LIST_PAGE = [
  { path: [ROUTES.HOME_PAGE, '/dashboards/all'], component: Home },
  { path: ROUTES.QUIZ_MANAGEMENT, component: Quiz },
  { path: ROUTES.QUIZ_TYPE, component: QuizType },
  { path: ROUTES.CREATE_QUIZ, component: NewQuiz },

  { path: ROUTES.ARTICLE_MANAGEMENT, component: Article },
  { path: ROUTES.CATEGORY_MANAGEMENT, component: Category },
  { path: ROUTES.CREATE_ARTICLE, component: NewArticle },

  { path: ROUTES.STATISTICAL_NEWS, component: StatisticalNews },
  { path: ROUTES.STATISTICAL_QUIZ, component: StatisticalQuiz },

  { path: ROUTES.MANAGE_ACCOUNT, component: Account },
  { path: ROUTES.PROFILE, component: Profile },
  { path: '/version', component: Version },
  { path: '*', component: NotFoundPage },
]

const MainPage = () => {

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout className="text-primary site-layout ml-52 bg-white">
        <Header />
        <ProgressTurn />
        <Content style={{ margin: '0 16px' }}>
          <div className="px-5 py-3 min-h-full" >
            <Suspense fallback={<ProgressTurn show />}>
              <Switch>
                {LIST_PAGE.map((item, index) =>
                  <Route
                    key={index}
                    exact={item.exact ?? true}
                    path={item.path}
                    component={item.component}
                  />
                )}
              </Switch>
            </Suspense>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>© Konec Co., Ltd - ĐKKD số 0108146759 - Ngày đăng ký: 27/01/2018 - Trụ sở: Đông Mỹ - Thanh Trì - Hà Nội - Người đại diện: Nguyễn Thu Hà</Footer>
      </Layout>
    </Layout>
  );
}

export default React.memo(MainPage);