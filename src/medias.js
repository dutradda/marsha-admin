import React from 'react';
import {
    ShowButton,
    List,
    Datagrid,
    TextField,
    EditButton,
    TextInput,
    FileInput,
    Filter,
    Create,
    SimpleForm,
    Toolbar,
    // Button,
    SaveButton,
    CreateView,
    translate,
    FileField
} from 'react-admin';
import inflection from 'inflection';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
// import  from '../i18n/translate';
// import CardActions from '@material-ui/core/CardActions';
// import UploadIcon from '@material-ui/icons/ArrowUpward';
import MediaListActions from './ui/MediaListActions';
// import dataProvider from './lib/dataProvider';

export const MediaList = props => (
    <List {...props} filters={<MediaFilter />} actions={<MediaListActions />}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
);

const MediaFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

export const MediaCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput label="Title" source="title" />
        </SimpleForm>
    </Create>
);

export const MediaMp3Upload = props => {
  const toolbar = (
    <Toolbar>
      <SaveButton label="Send" />
    </Toolbar>
  );

  return (
    <Upload {...props}>
      <SimpleForm toolbar={toolbar}>
        <FileInput source="data">
          <FileField source="previewUrl" src="preview" title="name" />
        </FileInput>
      </SimpleForm>
    </Upload>
  );
};

const Upload = props => (
    <UploadController {...props}>
        {controllerProps => <CreateView {...props} {...controllerProps} title="Upload Mp3 Zip" />}
    </UploadController>
);

class UploadController extends React.Component {
  save = (record, redirect) => {
    const form = new FormData();
    const graphqlQuery = `
      mutation {
        bulkInsertMedia {
          status
          currentCount
          totalCount
          error {
            name
            message
          }
        }
      }
    `;
    form.append('mediaFile', record.data.rawFile);

    return fetch(
      `http://localhost:8080/graphql?query=${encodeURIComponent(graphqlQuery)}`,
      {
        method: 'POST',
        body: form,
      }
    ).then(response => {
      response.json().then(json => {
        console.log(json);
      });
    });
  }

  defaultRedirectRoute() {
    return 'list';
  }

  render() {
    const {
        basePath,
        children,
        isLoading,
        resource,
        translate,
    } = this.props;

    if (!children) return null;

    const resourceName = translate(`resources.${resource}.name`, {
        smart_count: 1,
        _: inflection.humanize(inflection.singularize(resource)),
    });
    const defaultTitle = translate('ra.page.create', {
        name: `${resourceName}`,
    });
    return children({
        isLoading,
        defaultTitle,
        save: this.save,
        resource,
        basePath,
        record: this.record,
        redirect: this.defaultRedirectRoute(),
        translate,
    });
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.admin.loading > 0,
    };
}

UploadController = compose(
    connect(mapStateToProps),
    translate
)(UploadController);
