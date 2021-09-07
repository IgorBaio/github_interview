import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { Grid, Fade, Box, Link } from "@material-ui/core";
import { Formik } from "formik";
import PageView from "../../components/PageView";
import SearchButton from "./components/SearchButton";
import BigCard from "../../components/BigCard";
import Section from "../../components/Section";
import TablesList from "../../components/TablesList";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import SubHeader from "../../components/SubHeader";
import ModalAlert from "../../components/ModalAlert";
import TextInput from "../../components/TextInput";
import { getUser, toggleAlert } from "../../store/actions";
import { style } from "../../utils/commonStyles";
import CustomButton from "../../components/Button";

const FormValues = {
  initialValues: {
    username: "",
  },
  schema: Yup.object().shape({
    username: Yup.string().min(1, "Muito curto").required("Obrigatório"),
  }),
};

const ReceivePayment = ({ history }) => {
  //#region Declarações
  const styles = useStyles();
  const [stepTwoVisible, setStepTwoVisible] = useState(false);
  const [stepThreeVisible, setStepThreeVisible] = useState(false);
  const [state, setState] = useState({ username: "" });
  const [dataToTable, setDataToTable] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  const repos = useSelector((state) => state.user?.repos);
  const starred = useSelector((state) => state.user?.starred);
  const hasAlert = useSelector((state) => state.alert);
  const [resultTransition, setResultTransition] = useState({
    status: "alertFailed",
    statusColor: "#BE1E1E",
    statusTitle: "Atenção!",
    statusDescription: hasAlert?.settings?.message || "Aconteceu um erro !",
    btn: (
      <CustomButton
        style={style.btn}
        onClick={() => dispatch(toggleAlert(false, { message: "" }))}
        textButton="OK"
      />
    ),
  });
  //#endregion

  const onSubmit = (values) => {
    setState({
      ...state,
      username: values.username,
    });
    setStepTwoVisible(true);
  };

  //#region useEffects
  useEffect(() => {
    if (state.username) {
      dispatch(getUser(state.username));
    }
  }, [state.username]);
  useEffect(() => {
    if (hasAlert?.show) {
      setResultTransition({
        status: "alertFailed",
        statusColor: "#BE1E1E",
        statusTitle: "Atenção!",
        statusDescription: hasAlert?.settings?.message || "Aconteceu um erro !",
        btn: (
          <CustomButton
            style={style.btn}
            onClick={() => dispatch(toggleAlert(false, { message: "" }))}
            textButton="OK"
          />
        ),
      });
    }
  }, [hasAlert]);

  useEffect(() => {
    if (repos) {
      const dataToTableAux = [];
      repos?.forEach((item) => {
        dataToTableAux.push({
          id: item.id,
          fullName: { content: item.full_name },
          name: { content: item.name },
          htmlUrl: { content: <Link className={styles.link} href={item.html_url}>{item.html_url}</Link> },
          language: { content: item.language },
        });
      });
      setDataToTable(dataToTableAux);
      setStepThreeVisible(true);
    } else if (starred) {
      const dataToTableAux = [];
      starred.forEach((item) => {
        dataToTableAux.push({
          id: item.id,
          author: {
            content: (
              <span className={styles.author}>
                {item.owner.login}
              </span>
            ),
          },
          fullName: { content: item.full_name },
          name: { content: item.name },
          htmlUrl: { content: <Link className={styles.link} href={item.html_url}>{item.html_url}</Link>  },
          language: { content: item.language },
        });
      });
      setDataToTable(dataToTableAux);
      setStepThreeVisible(true);
    } else {
      setDataToTable([]);
      setStepThreeVisible(false);
    }
  }, [repos, starred]);
  //#endregion

  return (
    <PageView
      hasHeader
      title="Github - Interview"
      subHeader={
        <SubHeader
          title="Compasso Uol - IgorBaio"
          history={history}
          user={user || null}
        />
      }
      stylePage={{ display: "flex" }}
      pageContent={
        <Box>
          <Formik
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={FormValues.initialValues}
            validationSchema={FormValues.schema}
            onSubmit={(values) => onSubmit(values)}
          >
            {(Form) => (
              <>
                <BigCard minHeight={600}>
                  <Section
                    title="Inserir Nome do Usuário"
                    subTitle="Selecione o nome do usuário que deseja buscar."
                    minHeight={600}
                    visible={true}
                  >
                    <TextInput
                      autoFocus
                      label={"UserName"}
                      form={Form}
                      onChange={Form.handleChange}
                      value={Form.values.username}
                      id="username"
                      error={Form.errors.username}
                      onBlur={() => {
                        if (Form.values.username.length > 0) {
                          Form.handleSubmit();
                        }
                      }}
                      onKeyUp={(e) => {
                        if (e.keyCode === 13 || e.key === "Enter") {
                          Form.handleSubmit();
                        }
                      }}
                    />
                  </Section>
                  {stepTwoVisible && user && user.id && (
                    <Box
                      className={styles.boxButtons}
                    >
                      <SearchButton
                        mode={"editing"}
                        dispatch={dispatch}
                        user={user || null}
                      />
                    </Box>
                  )}

                  {stepThreeVisible && (
                    <Fade in={true} timeout={500}>
                      <Grid container item xs={12} style={{ marginTop: 0 }}>
                        {repos &&
                          (repos.length > 0 ? (
                            <TablesList
                              dataHeader={[
                                {
                                  id: "name",
                                  label: "Nome",
                                  align: "left",
                                  width: "5%",
                                },
                                {
                                  id: "language",
                                  label: "Linguagem",
                                  align: "left",
                                  width: "5%",
                                },
                                {
                                  id: "fullName",
                                  label: "Nome Completo",
                                  align: "left",
                                  width: "20%",
                                },
                                {
                                  id: "htmlUrl",
                                  label: "Url",
                                  align: "left",
                                  width: "10%",
                                },
                              ]}
                              dataRows={dataToTable}
                            />
                          ) : (
                            <span className={styles.noReposMessage}>
                              O usuário não possui repositórios públicos
                            </span>
                          ))}
                        {starred &&
                          (starred.length > 0 ? (
                            <TablesList
                              dataHeader={[
                                {
                                  id: "name",
                                  label: "Nome",
                                  align: "left",
                                  width: "5%",
                                },
                                {
                                  id: "author",
                                  label: "Autor",
                                  align: "center",
                                  width: "15%",
                                },
                                {
                                  id: "language",
                                  label: "Linguagem",
                                  align: "left",
                                  width: "5%",
                                },
                                {
                                  id: "fullName",
                                  label: "Nome Completo",
                                  align: "left",
                                  width: "20%",
                                },
                                {
                                  id: "htmlUrl",
                                  label: "Url",
                                  align: "left",
                                  width: "10%",
                                },
                              ]}
                              dataRows={dataToTable}
                            />
                          ) : (
                            <span className={styles.noReposMessage}>
                              O usuário não possui repositórios com estrela
                            </span>
                          ))}
                      </Grid>
                    </Fade>
                  )}
                </BigCard>
              </>
            )}
          </Formik>
          <ModalAlert
            resultTransition={resultTransition}
            isVisible={hasAlert?.show}
            onDismiss={() => dispatch(toggleAlert(false, { message: "" }))}
          />
        </Box>
      }
    />
  );
};

export default ReceivePayment;
