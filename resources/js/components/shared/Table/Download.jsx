import { mkConfig, generateCsv, download } from 'export-to-csv';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MdDownload, PiFilePdf, PiFileCsv, IoChevronForwardOutline } from '../../ui/Icons';
import { Button, DropDown } from '../../ui';
import { useTable } from './useTable';
import { IoDocumentOutline, IoDocumentsOutline } from 'react-icons/io5';
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';

const exportAsCsv = ({ data, config, page, isTrashed }) => {
  const filename = page
    ? `${config.filename}${isTrashed ? '-trashed' : ''}-page-${page}`
    : `${config.filename}${isTrashed ? '-trashed' : ''}`;
  const csv = generateCsv(mkConfig({ ...config, filename }))(data);
  download({ ...config, filename })(csv);
};

const exportAsPdf = ({ data, config, headers, page, isTrashed }) => {
  const tableData = data.map((row) => Object.values(row));
  const doc = new jsPDF(headers.length > 4 ? 'landscape' : 'portrait');

  autoTable(doc, {
    head: [config.tableHeaders],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: '#f0f0f0', textColor: '#000000' },
    styles: { cellPadding: 3 },
  });
  const name = page
    ? `${config.filename}${isTrashed ? '-trashed' : ''}-page-${page}.pdf`
    : `${config.filename}${isTrashed ? '-trashed' : ''}`;
  doc.save(name);
  // doc.output('dataurlnewwindow');
};

const cleanData = (data, columns) => {
  return (
    data
      // Filter the visible columns
      .map((el) => Object.fromEntries(Object.entries(el).filter(([key]) => columns.map((c) => c.key).includes(key))))
      // Sort the columns same as the headers
      .map((el) =>
        columns.reduce((acc, h) => {
          acc[h.key] = el[h.key];
          return acc;
        }, {})
      )
      // Format the columns that needs to be formatted
      .map((el) =>
        Object.keys(el).reduce((acc, k) => {
          const format = columns.find((h) => h.key === k).format; // value,id,isDownload
          acc[k] = format ? format(el[k], null, true) : el[k];
          return acc;
        }, {})
      )
  );
};

//* Download
export function Download() {
  const { rows } = useTable();

  return (
    <DropDown
      toggler={
        <Button display='with-icon' type='outline' color='tertiary'>
          <MdDownload />
          Download
        </Button>
      }
      options={{
        className: 'w-40',
      }}
      togglerDisabled={rows?.length === 0}
    >
      <DownloadOption type='pdf' icon={<PiFilePdf />} />
      <DownloadOption type='csv' icon={<PiFileCsv />} />
    </DropDown>
  );
}

function DownloadOption({ type, icon }) {
  const { data, rows, csvConfig, pdfConfig, columns, page, selected, isTrashed } = useTable();

  const download = (downloadType, dataSubset, currentPage = null, selectedRows = null) => {
    const filteredData = selectedRows ? dataSubset.filter((el) => selectedRows.includes(el.id)) : dataSubset;
    const headers = columns.filter((c) => c.visible);
    const data = cleanData(filteredData, headers);

    const options = { data, headers, page: currentPage, isTrashed };

    if (downloadType === 'pdf') exportAsPdf({ ...options, config: pdfConfig });
    else if (downloadType === 'csv') exportAsCsv({ ...options, config: csvConfig });
  };

  return (
    <DropDown.NestedMenu
      toggler={
        <DropDown.Option className='justify-between'>
          {icon}
          <span className='text-start'>{type.toUpperCase()}</span>
          <IoChevronForwardOutline />
        </DropDown.Option>
      }
      options={{ placement: 'right-start' }}
    >
      <DropDown.Option onClick={() => download(type, data)}>
        <IoDocumentsOutline /> All Pages
      </DropDown.Option>
      <DropDown.Option onClick={() => download(type, rows, page)}>
        <IoDocumentOutline /> This Page
      </DropDown.Option>
      {selected.length > 0 && (
        <DropDown.Option onClick={() => download(type, rows, null, selected)}>
          <HiOutlineClipboardDocumentCheck /> Selected
        </DropDown.Option>
      )}
    </DropDown.NestedMenu>
  );
}
