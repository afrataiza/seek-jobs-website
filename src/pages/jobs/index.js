import React, { useContext, useEffect } from 'react'

import JobsBox from '../../components/box'
import NavMenu from '../../components/navMenu'
import PaginationJobs from '../../components/pagination'
import RootStoreContext from '../../store/rootStore'
import JobsController from '../../controller/jobsController'

import { Container } from '@mui/material'

import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'


const JobsPage = observer(() => {

  const { jobsStore } = useContext(RootStoreContext)
  const controller = new JobsController(jobsStore)

  useEffect(() => {
    controller.getAllJobs()
  }, [])


  return (
    <Container>
      <NavMenu />
      {jobsStore.state.jobsList.map((job) => (
        <JobsBox
          urlImage={job.urlImage !== '' ? job.urlImage : ''}
          title={job.title}
          description={job.description}
          local={job.local}
          tecnologies={job.tecnologies !== '' ? job.tecnologies : ''}
          salary={job.salary}
          link={job.link}
        />
      ))}
      <PaginationJobs page={jobsStore.state.page} onChange={() => {
        jobsStore.state.page(jobsStore.state.page++)
        controller.getAllJobs()
      }
      }
      />
    </Container>
  )
}
)

export default JobsPage