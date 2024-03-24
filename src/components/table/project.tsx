import { ProjectDocument } from '../../../prismicio-types'
import Head from './head'
import Root from './root'
import RowDisplay from './row-display'

const TableProject = ({ project }: { project: ProjectDocument<string> }) => {
  return (
    <Root className={'mb-2.5'}>
      <Head className={'pt-6 pb-1 sm:mb-0 -mb-4'} />
      <RowDisplay
        index={0}
        year={project.data.year as string | number}
        title={project.data.title as string}
        client={project.data.client as string}
        roleField={project.data.role as string}
      />
    </Root>
  )
}

export default TableProject
