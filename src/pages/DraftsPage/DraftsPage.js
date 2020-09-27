import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllScores, fetchReviewRequests } from '../../services/ServerRequest';
import DraftsList from './DraftsList';
import checkAuth from '../../utils/checkAuth';

import './_DraftsPage.scss';

function DraftsPage({ history }) {
  const dispatch = useDispatch();
  const { authentication } = useSelector(({ statesAccount }) => statesAccount);
  const [checkDraftsList, setCheckDraftsList] = useState([]);
  const [selfCheckDraftsList, setSelfCheckDraftsList] = useState([]);
  const user = useSelector(state => state.statesAccount.infoUser.id);

  useEffect(() => {
    !authentication && checkAuth(history, authentication, dispatch, '/drafts');
  }, []);

  useEffect(() => {
    fetchAllScores()
      .then(allScores => {
        const checkDrafts = allScores
          .filter(score => score.reviewer === user)
          .filter(score => score.status === 'checkDraft');
        setCheckDraftsList(checkDrafts);
      })
    fetchReviewRequests()
      .then(allRequests => {
        const selfCheckDrafts = allRequests
          .filter(request => request.student === user)
          .filter(request => request.status === 'selfCheckDraft');
        setSelfCheckDraftsList(selfCheckDrafts)
      })
  }, [user]);

  return (
    <div className="account">
      <div className="drafts">
        <h2 className="drafts__title">DRAFTS</h2>
        <p className="drafts__info">If you started to review your task or the work other student,
        you can save it as a draft and go back to your review on this page.</p>
        <section>
          <h2>Other students' review drafts</h2>
          {
            checkDraftsList &&
            <DraftsList draftsList={checkDraftsList} type="check" />
          }
        </section>
        <section>
          <h2>Self check drafts</h2>
          {
            selfCheckDraftsList &&
            <DraftsList draftsList={selfCheckDraftsList} type="selfCheck" />
          }
        </section>
      </div>
    </div >
  );
}

export default DraftsPage;
